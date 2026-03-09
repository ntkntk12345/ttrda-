import { MovieListResponse, MovieDetailResponse } from '@/types/ophim';

const API_HOST = 'https://ophim1.com';

export const OphimService = {
    /**
     * Lấy danh sách phim mới cập nhật (cho Trang chủ)
     */
    getHomeMovies: async (page: number = 1): Promise<MovieListResponse | null> => {
        try {
            const res = await fetch(`${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?page=${page}`, {
                next: { revalidate: 3600 }, // Cache 1 hour
            });
            if (!res.ok) throw new Error('Failed to fetch home movies');
            const data = await res.json();

            // Check if data is nested
            if (data?.data?.items) {
                return {
                    status: data.status,
                    items: data.data.items,
                    pathImage: data.data.APP_DOMAIN_CDN_IMAGE || '',
                    pagination: {
                        ...data.data.params?.pagination,
                        totalPages: Math.ceil((data.data.params?.pagination?.totalItems || 0) / (data.data.params?.pagination?.totalItemsPerPage || 1))
                    }
                } as unknown as MovieListResponse;
            }

            return data;
        } catch (error) {
            console.error('getHomeMovies error:', error);
            return null;
        }
    },

    getMovieBySlug: async (slug: string): Promise<MovieDetailResponse | null> => {
        console.log(`[OphimService] Fetching movie: ${slug}`);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

            const res = await fetch(`${API_HOST}/v1/api/phim/${slug}`, {
                cache: 'no-store',
                signal: controller.signal,
            });
            clearTimeout(timeoutId);

            if (!res.ok) {
                console.error(`[OphimService] Failed to fetch: ${res.status} ${res.statusText}`);
                // Don't throw immediately, check if we can parse error body or just return null
                // But usually 404 or 500 means failed.
                throw new Error(`Failed to fetch movie detail: ${res.status}`);
            }

            const data = await res.json();

            // Log raw status
            // console.log(`[OphimService] API Status: ${data?.status}`);

            // OPhim Detail API returns data in 'data.item'
            if (data?.data?.item) {
                const movie = data.data.item;
                const episodes = movie.episodes || [];
                return {
                    status: data.status === 'success' || data.status === true,
                    msg: data.msg || '',
                    movie: movie,
                    episodes: episodes
                } as MovieDetailResponse;
            }
            return data;
        } catch (error) {
            console.error('[OphimService] getMovieBySlug error:', error);
            return null;
        }
    },

    /**
     * Lấy danh sách phim theo danh mục (Phim lẻ, Phim bộ, Hoạt hình, TV Shows)
     */
    getMoviesByCategory: async (type: string, page: number = 1): Promise<MovieListResponse | null> => {
        try {
            const res = await fetch(`${API_HOST}/v1/api/danh-sach/${type}?page=${page}`, {
                next: { revalidate: 3600 },
            });
            if (!res.ok) throw new Error(`Failed to fetch movies by category: ${type}`);
            const data = await res.json();

            // OPhim Category API returns data nested in 'data' field
            if (data?.data?.items) {
                return {
                    status: data.status,
                    items: data.data.items,
                    pathImage: data.data.APP_DOMAIN_CDN_IMAGE || '',
                    pagination: {
                        ...data.data.params?.pagination,
                        totalPages: Math.ceil((data.data.params?.pagination?.totalItems || 0) / (data.data.params?.pagination?.totalItemsPerPage || 1))
                    }
                } as unknown as MovieListResponse;
            }
            return data;
        } catch (error) {
            console.error('getMoviesByCategory error:', error);
            return null;
        }
    },

    /**
     * Tìm kiếm phim
     */
    searchMovies: async (keyword: string): Promise<MovieListResponse | null> => {
        try {
            const res = await fetch(`${API_HOST}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}`, {
                cache: 'no-store', // Search results should not be cached tightly
            });
            if (!res.ok) throw new Error('Failed to search movies');
            const data = await res.json();

            // OPhim Search API returns data nested in 'data' field
            if (data?.data?.items) {
                return {
                    status: data.status,
                    items: data.data.items,
                    pathImage: data.data.APP_DOMAIN_CDN_IMAGE || '',
                    pagination: {
                        ...data.data.params?.pagination,
                        totalPages: Math.ceil((data.data.params?.pagination?.totalItems || 0) / (data.data.params?.pagination?.totalItemsPerPage || 1))
                    }
                } as unknown as MovieListResponse;
            }
            return data;
        } catch (error) {
            console.error('searchMovies error:', error);
            return null;
        }
    },
    /**
     * Lọc phim theo nhiều tiêu chí
     */
    /**
     * Lọc phim theo nhiều tiêu chí
     */
    filterMovies: async (params: { category?: string; country?: string; year?: string; type?: string; sort?: string; page?: number }): Promise<MovieListResponse | null> => {
        try {
            const queryParams = new URLSearchParams();
            // Use correct parameter names supported by Ophim API
            if (params.category) queryParams.set('category', params.category);
            if (params.country) queryParams.set('country', params.country);
            if (params.year) queryParams.set('year', params.year);
            if (params.sort) queryParams.set('sort', params.sort);
            queryParams.set('page', (params.page || 1).toString());

            // Determine the base endpoint
            let endpoint = 'phim-moi-cap-nhat';
            if (params.type) {
                endpoint = params.type;
                // If type is selected (e.g. phim-le), we don't need to pass it as a query param
            }

            const res = await fetch(`${API_HOST}/v1/api/danh-sach/${endpoint}?${queryParams.toString()}`, {
                next: { revalidate: 300 }, // Cache 5 min for filtered results
            });

            if (!res.ok) throw new Error('Failed to filter movies');
            const data = await res.json();

            if (data?.data?.items) {
                return {
                    status: data.status,
                    items: data.data.items,
                    pathImage: data.data.APP_DOMAIN_CDN_IMAGE || '',
                    pagination: {
                        ...data.data.params?.pagination,
                        totalPages: Math.ceil((data.data.params?.pagination?.totalItems || 0) / (data.data.params?.pagination?.totalItemsPerPage || 1))
                    }
                } as unknown as MovieListResponse;
            }
            return data;
        } catch (error) {
            console.error('filterMovies error:', error);
            console.error('Params:', params);
            return null;
        }
    },
};
