"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, Info, Star, Calendar, Clock } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel";
import { OPhimUtils } from '@/utils/ophim';
import Autoplay from "embla-carousel-autoplay"; // We might need to install this if we want autoplay, but for now manual

interface HeroSectionProps {
    movies: any[]; // Replace 'any' with proper Movie type if available
}

export default function HeroSection({ movies }: HeroSectionProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollTo = useCallback((index: number) => {
        api?.scrollTo(index);
    }, [api]);

    if (!movies || movies.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full h-[85vh] md:h-[90vh] bg-[#040714] overflow-hidden text-white group">
            <Carousel
                setApi={setApi}
                className="w-full h-full"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                opts={{
                    loop: true,
                    duration: 60,
                }}
            >
                <CarouselContent className="h-full ml-0">
                    {movies.map((movie, index) => (
                        <CarouselItem key={movie._id || index} className="pl-0 h-full relative">
                            {/* Background Image (Backdrop) */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={OPhimUtils.getPosterUrl(movie.poster_url)} // Ideally use backdrop/thumb if available, else poster
                                    alt={movie.name}
                                    fill
                                    className="object-cover object-top md:object-center opacity-90"
                                    priority={index === 0}
                                />

                                {/* Vignette / Gradient Overlay */}
                                {/* Bottom fade */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/80 to-transparent" />
                                {/* Left fade for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/60 to-transparent" />
                            </div>

                            {/* Content Container */}
                            <div className="absolute inset-0 z-10 flex items-center">
                                <div className="container mx-auto px-4 md:px-8 mt-20 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
                                        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300">
                                            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-current" /> IMDb {typeof movie.imdb === 'object' ? movie.imdb?.vote_average : (movie.imdb || 'N/A')}
                                            </span>
                                            <span className="bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {movie.year}
                                            </span>
                                            <span className="bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {movie.time || 'N/A'}
                                            </span>
                                            <span className="text-primary font-bold uppercase tracking-wider text-xs">
                                                {movie.lang} • {movie.quality}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[#F9F9F9] drop-shadow-2xl">
                                            {movie.name}
                                        </h1>
                                        <p className="text-xl md:text-2xl text-gray-400 font-light italic">
                                            {movie.origin_name}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <Link
                                                href={`/watch/${movie.slug}`}
                                                className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)] group/play"
                                            >
                                                <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover/play:bg-black/20 transition-colors">
                                                    <Play className="fill-current w-4 h-4" />
                                                </div>
                                                <span className="text-lg">Xem Phim</span>
                                            </Link>

                                            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 px-6 py-4 rounded-full font-semibold transition-all hover:border-white/40">
                                                <Plus className="w-5 h-5" />
                                                <span>Thêm vào DS</span>
                                            </button>

                                            <Link
                                                href={`/phim/${movie.slug}`}
                                                className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-4 font-medium transition-colors"
                                            >
                                                <Info className="w-5 h-5" />
                                                <span>Chi Tiết</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {/* Navigation Arrows or Dots can go here if needed, but we use Thumbnails below */}
            </Carousel>

            {/* Thumbnail Navigation (Bottom Right) */}
            <div
                className="absolute bottom-8 right-8 z-20 hidden lg:flex gap-4 max-w-[50%] overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {movies.map((movie, index) => (
                    <button
                        key={`thumb-${index}`}
                        onClick={() => scrollTo(index)}
                        className={`relative w-32 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 flex-shrink-0 group/thumb ${current === index
                            ? 'border-yellow-500 shadow-lg scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                    >
                        <Image
                            src={OPhimUtils.getPosterUrl(movie.poster_url)} // Use Thumb if available
                            alt={movie.name}
                            fill
                            className="object-cover transform group-hover/thumb:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors" />
                        {/* Play Icon Overlay on active */}
                        {current === index && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white fill-current drop-shadow-md" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Mobile Dots Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex lg:hidden gap-2 z-20">
                {movies.map((_, index) => (
                    <button
                        key={`dot-${index}`}
                        onClick={() => scrollTo(index)}
                        className={`w-2 h-2 rounded-full transition-all ${current === index ? 'bg-yellow-500 w-6' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
