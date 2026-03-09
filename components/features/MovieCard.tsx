import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface MovieCardProps {
    movie: {
        name: string;
        origin_name: string;
        thumb_url: string;
        poster_url: string;
        slug: string;
        year: number;
        lang?: string;
        quality?: string;
    };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link href={`/phim/${movie.slug}`} className="group relative block aspect-[2/3] overflow-hidden rounded-xl bg-card-dark transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 hover:z-10">
            {/* Thumbnail Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={movie.thumb_url.startsWith('http') ? movie.thumb_url : `https://img.ophim.live/uploads/movies/${movie.thumb_url}`}
                    alt={movie.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-40"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    loading="lazy"
                />
            </div>

            {/* Hover Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Play Button */}
                    <div className="mb-3 flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
                            <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                    </div>

                    <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">{movie.name}</h3>
                    <p className="text-gray-400 text-xs line-clamp-1 mb-2">{movie.origin_name}</p>

                    <div className="flex items-center gap-2 text-[10px] font-medium">
                        <span className="bg-white/20 px-2 py-0.5 rounded text-white">{movie.year}</span>
                        {movie.quality && <span className="bg-primary/80 px-2 py-0.5 rounded text-white">{movie.quality}</span>}
                        <span className="border border-white/30 px-2 py-0.5 rounded text-gray-300">{movie.lang || 'VietSub'}</span>
                    </div>
                </div>
            </div>

            {/* Default Badge (Visible when not hovering) */}
            <div className="absolute top-2 right-2 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                    {movie.quality || 'HD'}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-white text-sm font-semibold truncate">{movie.name}</h3>
            </div>
        </Link>
    );
};

export default MovieCard;
