"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface EpisodeGroupProps {
    episodes: any[];
    currentEpisode?: string;
    currentServer?: string;
}

const EpisodeGroup: React.FC<EpisodeGroupProps> = ({ episodes, currentEpisode, currentServer }) => {
    // Group episodes by server_name
    // Phase 3 will have real data structure
    const mockServers = episodes && episodes.length > 0 ? episodes : [
        { server_name: 'Vietsub #1', server_data: Array.from({ length: 12 }, (_, i) => ({ name: `Tập ${i + 1}`, slug: `tap-${i + 1}`, link_embed: '' })) },
        { server_name: 'Thuyết Minh #1', server_data: Array.from({ length: 12 }, (_, i) => ({ name: `Tập ${i + 1}`, slug: `tap-${i + 1}`, link_embed: '' })) }
    ];

    const initialServerIndex = mockServers.findIndex((s: any) => s.server_name === currentServer);
    const [activeServer, setActiveServer] = useState(initialServerIndex >= 0 ? initialServerIndex : 0);

    // Sync state if prop changes (optional, but good for navigation)
    React.useEffect(() => {
        if (currentServer) {
            const idx = mockServers.findIndex((s: any) => s.server_name === currentServer);
            if (idx >= 0) setActiveServer(idx);
        }
    }, [currentServer, mockServers]);

    return (
        <div className="bg-card-dark rounded-xl p-6 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                Danh Sách Tập
            </h3>

            {/* Server Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {mockServers.map((server: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => setActiveServer(index)}
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {mockServers[activeServer].server_data.map((ep: any, index: number) => (
                    <Link
                        key={index}
                        href={`?tap=${ep.slug}&server=${encodeURIComponent(mockServers[activeServer].server_name)}`}
                        scroll={false} // Prevent full page scroll reset
                        className={cn(
                            "py-2 rounded text-xs font-semibold transition-all border text-center block",
                            currentEpisode === ep.slug
                                ? "bg-white text-background-dark border-white"
                                : "bg-transparent text-gray-300 border-white/10 hover:border-primary hover:text-primary"
                        )}
                    >
                        {ep.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EpisodeGroup;
