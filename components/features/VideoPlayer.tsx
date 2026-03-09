"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import {
    Play, Pause, Volume2, VolumeX, Maximize, Minimize,
    Settings, RotateCcw, RotateCw, AlertCircle, Loader2
} from 'lucide-react';

// Helper for class names
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface VideoPlayerProps {
    episode?: {
        link_m3u8?: string;
        link_embed?: string;
        name?: string;
    };
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ episode }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);

    const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Format time helper
    const formatTime = (time: number) => {
        if (!time) return "00:00";
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Initialize HLS
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        setError(null);
        setIsPlaying(false);
        setIsLoading(true);
        setCurrentTime(0);
        setDuration(0);

        let hls: Hls | null = null;
        const src = episode?.link_m3u8;

        if (src) {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    setIsLoading(false);
                });
                hls.on(Hls.Events.ERROR, (event, data) => {
                    if (data.fatal) {
                        setIsLoading(false);
                        setError('Không thể tải video (HLS Error). Vui lòng thử server khác.');
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = src;
            } else {
                setError('Trình duyệt không hỗ trợ phát HLS.');
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [episode]);

    // Handle Controls Visibility
    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration || 0);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const seekRelative = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            videoRef.current.muted = newVolume === 0;
        }
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
            if (!newMuted && volume === 0) {
                setVolume(0.5);
                videoRef.current.volume = 0.5;
            }
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const changePlaybackRate = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
            setShowSettings(false);
        }
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only if player is focused or active (simple check: if not typing in input)
            if (document.activeElement?.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ':
                case 'k':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    seekRelative(-10);
                    break;
                case 'ArrowRight':
                    seekRelative(10);
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPlaying]); // Re-bind isn't strictly necessary but safe

    if (!episode) {
        return (
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-gray-500">
                <p>Chọn tập phim để xem</p>
            </div>
        );
    }

    if (!episode.link_m3u8 && episode.link_embed) {
        return (
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative z-20">
                <iframe
                    src={episode.link_embed}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="aspect-video bg-black rounded-xl overflow-hidden relative group z-20 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 bg-gray-900 z-50">
                    <AlertCircle className="w-10 h-10 mb-2" />
                    <p>{error}</p>
                </div>
            )}

            {/* Loading Spinner */}
            {isLoading && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-40 pointer-events-none">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
            />

            {/* Custom Controls Overlay */}
            <div className={classNames(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 flex flex-col justify-end p-4 z-30 pointer-events-none",
                showControls ? "opacity-100" : "opacity-0"
            )}>
                {/* Progress Bar */}
                <div className="w-full mb-4 flex items-center gap-2 group/timeline pointer-events-auto">
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        style={{
                            backgroundSize: `${(currentTime / duration) * 100}% 100%`,
                        }}
                        className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer 
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                        [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full hover:h-1.5 transition-all
                        bg-gradient-to-r from-white to-white bg-no-repeat"
                    />
                </div>

                {/* Button Controls */}
                <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-4">
                        <button onClick={togglePlay} className="hover:text-primary transition-colors text-white">
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
                        </button>

                        <div className="flex items-center gap-2 text-white">
                            <button onClick={() => seekRelative(-10)} className="hover:text-primary transition-colors" title="Lùi 10s">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            <button onClick={() => seekRelative(10)} className="hover:text-primary transition-colors" title="Tiến 10s">
                                <RotateCw className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 group/volume">
                            <button onClick={toggleMute} className="hover:text-primary transition-colors text-white">
                                {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="w-0 overflow-hidden group-hover/volume:w-20 transition-all h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>

                        <span className="text-sm font-medium text-gray-300">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 relative">
                        {/* Speed Setting */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="hover:text-primary transition-colors text-white flex items-center gap-1"
                            >
                                <span className="text-sm font-bold">{playbackRate}x</span>
                                <Settings className="w-5 h-5" />
                            </button>

                            {showSettings && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/10 rounded-lg p-2 min-w-[100px] shadow-xl">
                                    {[0.5, 1, 1.25, 1.5, 2].map(rate => (
                                        <button
                                            key={rate}
                                            onClick={() => changePlaybackRate(rate)}
                                            className={classNames(
                                                "block w-full text-left px-3 py-1.5 text-sm rounded hover:bg-white/20 transition-colors",
                                                playbackRate === rate ? "text-primary font-bold" : "text-white"
                                            )}
                                        >
                                            {rate}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button onClick={toggleFullscreen} className="hover:text-primary transition-colors text-white">
                            {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
