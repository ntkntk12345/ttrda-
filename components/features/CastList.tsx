"use strict";
import React from 'react';
import Image from 'next/image';

interface CastListProps {
    actors: string[];
}

export default function CastList({ actors }: CastListProps) {
    if (!actors || actors.length === 0) return null;

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Diễn viên</h3>
            <div className="grid grid-cols-3 gap-4">
                {actors.slice(0, 9).map((actor, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 mb-2 relative bg-gray-800">
                            {/* Placeholder avatar generator */}
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=random&color=fff`}
                                alt={actor}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-xs text-gray-300 font-medium line-clamp-2">
                            {actor}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
