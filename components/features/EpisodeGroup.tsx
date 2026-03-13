"use client";

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface Episode {
    name: string;
    slug: string;
    link_embed?: string;
    link_m3u8?: string;
}

interface Server {
    server_name: string;
    server_data: Episode[];
}

interface EpisodeGroupProps {
    episodes: Server[];
    currentEpisode?: string;
    currentServer?: string;
    activeServerIdx?: number;
    onEpisodeSelect?: (episode: Episode, serverIdx: number) => void;
}

const EpisodeGroup: React.FC<EpisodeGroupProps> = ({
    episodes,
    currentEpisode,
    currentServer,
    activeServerIdx: externalServerIdx,
    onEpisodeSelect,
}) => {
    const servers = episodes && episodes.length > 0 ? episodes : [];

    const getInitialIdx = () => {
        if (externalServerIdx !== undefined) return externalServerIdx;
        if (currentServer) {
            const idx = servers.findIndex(s => s.server_name === currentServer);
            if (idx >= 0) return idx;
        }
        return 0;
    };

    const [localActiveServer, setLocalActiveServer] = useState(getInitialIdx);

    // Use external idx if provided, otherwise use local state
    const activeServer = externalServerIdx !== undefined ? externalServerIdx : localActiveServer;

    const handleServerChange = (idx: number) => {
        setLocalActiveServer(idx);
    };

    const handleEpisodeClick = (episode: Episode) => {
        if (onEpisodeSelect) {
            onEpisodeSelect(episode, activeServer);
        }
    };

    if (servers.length === 0) {
        return (
            <div className="bg-card-dark rounded-xl p-6 border border-white/5">
                <p className="text-gray-400 text-sm">Không có tập phim nào.</p>
            </div>
        );
    }

    const activeServerData = servers[activeServer];

    return (
        <div className="bg-card-dark rounded-xl p-6 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Danh Sách Tập
            </h3>

            {/* Server Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {servers.map((server, index) => (
                    <button
                        key={index}
                        onClick={() => handleServerChange(index)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeServer === index
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {server.server_name}
                    </button>
                ))}
            </div>

            {/* Episodes Grid */}
            {activeServerData && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-2">
                    {activeServerData.server_data.map((ep, index) => (
                        <button
                            key={index}
                            onClick={() => handleEpisodeClick(ep)}
                            className={cn(
                                "py-2 rounded text-xs font-semibold transition-all border text-center",
                                currentEpisode === ep.slug
                                    ? "bg-cyan-400 text-black border-cyan-400 shadow-lg shadow-cyan-400/20"
                                    : "bg-transparent text-gray-300 border-white/10 hover:border-cyan-400/50 hover:text-cyan-400"
                            )}
                        >
                            {ep.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EpisodeGroup;
