
import { OphimService } from '@/services/ophim';
import { OPhimUtils } from '@/utils/ophim';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Calendar, Globe, Clock, Star, Share2, Eye } from 'lucide-react';
import EpisodeGroup from '@/components/features/EpisodeGroup';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const data = await OphimService.getMovieBySlug(decodedSlug);
    if (!data?.movie) return { title: 'Movie Not Found' };

    return {
        title: `${data.movie.name} - Xem phim Online`,
        description: OPhimUtils.cleanContent(data.movie.content || '').substring(0, 160),
        openGraph: {
            images: [OPhimUtils.getThumbUrl(data.movie.thumb_url)],
        },
    };
}

export default async function MovieDetailPage({ params }: PageProps) {
    const { slug } = await params;
    console.log('Page Slug:', slug);
    const decodedSlug = decodeURIComponent(slug);
    console.log('Decoded Slug:', decodedSlug);
    const data = await OphimService.getMovieBySlug(decodedSlug);
    console.log('Movie Data Status:', data?.status);
    console.log('Movie Name:', data?.movie?.name);

    if (!data || !data.movie) {
        notFound();
    }

    const { movie, episodes } = data;

    return (
        <div className="min-h-screen pb-20">
            {/* Backdrop Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src={OPhimUtils.getPosterUrl(movie.poster_url)}
                    alt={movie.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
                <div className="absolute inset-0 backdrop-blur-sm bg-background-dark/30" />
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster Card */}
                    <div className="w-full md:w-72 flex-shrink-0">
                        <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl border-4 border-card-dark">
                            <Image
                                src={OPhimUtils.getThumbUrl(movie.thumb_url)}
                                alt={movie.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Link
                            href={episodes?.[0]?.server_data?.[0]?.slug ? `/watch/${movie.slug}` : '#'}
                            className="mt-4 w-full bg-primary hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                        >
                            <Play className="fill-current w-5 h-5" />
                            XEM NGAY
                        </Link>
                    </div>

                    {/* Info Content */}
                    <div className="flex-1 text-white pt-4 md:pt-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-2">{movie.name}</h1>
                        <h2 className="text-xl md:text-2xl text-gray-300 font-medium mb-6">{movie.origin_name}</h2>

                        {/* Meta Stats */}
                        <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{movie.year}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" />
                                <span>{movie.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-primary" />
                                <span>{movie.country?.[0]?.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-primary" />
                                <span>{movie.view} lượt xem</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold mb-3 border-l-4 border-primary pl-3">Nội Dung Phim</h3>
                            <div
                                className="text-gray-300 leading-relaxed text-base/7"
                                dangerouslySetInnerHTML={{ __html: movie.content || '' }}
                            />
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Đạo Diễn</h3>
                                <p className="text-white font-medium">{movie.director?.join(', ') || 'N/A'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Diễn Viên</h3>
                                <p className="text-white font-medium line-clamp-2">{movie.actor?.join(', ') || 'N/A'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Thể Loại</h3>
                                <div className="flex flex-wrap gap-2">
                                    {movie.category?.map(cat => (
                                        <span key={cat.id} className="bg-white/10 px-3 py-1 rounded-full text-xs hover:bg-primary cursor-pointer transition-colors">
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Episodes */}
                        {episodes && episodes.length > 0 && (
                            <div className="mt-12">
                                <EpisodeGroup episodes={episodes} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
