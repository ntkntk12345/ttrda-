"use strict";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, TrendingUp } from 'lucide-react';
import { OPhimUtils } from '@/utils/ophim';
import { Movie } from '@/types/ophim';

interface TrendingListProps {
    movies: Movie[];
}

export default function TrendingList({ movies }: TrendingListProps) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="bg-[#1e293b]/50 rounded-xl border border-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-white">Top Xem Nhiều</h3>
            </div>

            <div className="divide-y divide-white/5">
                {movies.map((movie, index) => (
                    <Link
                        key={movie._id}
                        href={`/phim/${movie.slug}`}
                        className="flex gap-4 p-4 hover:bg-white/5 transition-colors group"
                    >
                        <div className="relative w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src={OPhimUtils.getThumbUrl(movie.thumb_url || movie.poster_url)}
                                alt={movie.name}
                                fill
                                className="object-cover"
                            />
                            {/* Rank Badge */}
                            <div className={`absolute top-0 left-0 w-6 h-6 flex items-center justify-center font-bold text-xs text-white
                                ${index === 0 ? 'bg-yellow-500' :
                                    index === 1 ? 'bg-gray-400' :
                                        index === 2 ? 'bg-orange-700' : 'bg-black/60'}
                            `}>
                                {index + 1}
                            </div>
                        </div>

                        <div className="flex-1 min-w-0 py-1">
                            <h4 className="text-white font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                                {movie.name}
                            </h4>
                            <p className="text-gray-500 text-xs truncate mb-2">{movie.origin_name}</p>
                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                <Eye className="w-3 h-3" />
                                <span>{Math.floor(Math.random() * 10000)} lượt xem</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-3 text-center">
                <Link href="/danh-sach/phim-hot" className="text-xs text-primary hover:text-white font-medium transition-colors">
                    Xem tất cả
                </Link>
            </div>
        </div>
    );
}
