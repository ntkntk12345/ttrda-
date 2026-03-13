"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import VideoPlayer from './VideoPlayer';
import EpisodeGroup from './EpisodeGroup';

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

interface WatchClientProps {
    episodes: Server[];
    initialEpisodeSlug?: string;
    initialServer?: string;
}

export default function WatchClient({ episodes, initialEpisodeSlug, initialServer }: WatchClientProps) {
    const router = useRouter();
    const pathname = usePathname();

    const getInitialServerIdx = () => {
        if (initialServer && episodes.length > 0) {
            const idx = episodes.findIndex(s => s.server_name === initialServer);
            if (idx >= 0) return idx;
        }
        return 0;
    };

    const [activeServerIdx, setActiveServerIdx] = useState(getInitialServerIdx);

    const getInitialEpisode = (serverIdx: number): Episode | null => {
        const server = episodes[serverIdx];
        if (!server || server.server_data.length === 0) return null;
        if (initialEpisodeSlug) {
            const ep = server.server_data.find(e => e.slug === initialEpisodeSlug);
            if (ep) return ep;
        }
        return server.server_data[0];
    };

    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(() => getInitialEpisode(getInitialServerIdx()));

    const handleEpisodeSelect = (episode: Episode, serverIdx: number) => {
        setCurrentEpisode(episode);
        setActiveServerIdx(serverIdx);
        const serverName = episodes[serverIdx]?.server_name || '';
        router.replace(`${pathname}?tap=${episode.slug}&server=${encodeURIComponent(serverName)}`, { scroll: false });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Video Player - Main */}
            <div className="w-full lg:flex-1 min-w-0">
                <VideoPlayer episode={currentEpisode || undefined} />
            </div>

            {/* Episode List - Sidebar on desktop, below on mobile */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0">
                <div className="sticky top-24">
                    <EpisodeGroup
                        episodes={episodes}
                        currentEpisode={currentEpisode?.slug}
                        currentServer={episodes[activeServerIdx]?.server_name}
                        activeServerIdx={activeServerIdx}
                        onEpisodeSelect={handleEpisodeSelect}
                    />
                </div>
            </div>
        </div>
    );
}
