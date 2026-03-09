"use strict";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { OPhimUtils } from '@/utils/ophim';
import { Movie } from '@/types/ophim';

interface RelatedMoviesProps {
    movies: Movie[];
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {
    if (!movies || movies.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-primary pl-3">
                Có thể bạn sẽ thích
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map((movie) => (
                    <Link
                        key={movie._id}
                        href={`/phim/${movie.slug}`}
                        className="group relative block aspect-[2/3] rounded-xl overflow-hidden bg-gray-800"
                    >
                        <Image
                            src={OPhimUtils.getThumbUrl(movie.thumb_url || movie.poster_url)}
                            alt={movie.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/90 text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                                <Play className="fill-current w-5 h-5 ml-1" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <h4 className="text-white font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                                {movie.name}
                            </h4>
                            <p className="text-gray-400 text-xs mt-1">
                                {movie.year} • {movie.quality}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
