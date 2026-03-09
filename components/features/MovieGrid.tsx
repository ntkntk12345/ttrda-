import React from 'react';
import MovieCard from './MovieCard';

interface MovieGridProps {
    movies: any[];
    title?: string;
    className?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title, className }) => {
    return (
        <div className={`mb-12 ${className}`}>
            {title && (
                <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-primary pl-4 flex items-center">
                    {title}
                </h2>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieGrid;
