export interface OPhimResponse<T> {
    status: boolean;
    msg: string;
    data: T;
}

export interface Movie {
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    thumb_url: string;
    poster_url: string;
    year: number;
    time?: string;
    quality?: string;
    lang?: string;
    content?: string;
    actor?: string[];
    director?: string[];
    category?: Category[];
    country?: Country[];
    episodes?: EpisodeServer[];
    // Additional fields for detail view
    status?: string;
    is_copyright?: boolean;
    sub_docquyen?: boolean;
    chieurap?: boolean;
    trailer_url?: string;
    episode_current?: string;
    episode_total?: string;
    view?: number;
    // Rating fields that might be objects
    tmdb?: {
        id?: string | number;
        vote_average?: number;
        vote_count?: number;
    };
    imdb?: {
        id?: string | number;
        vote_average?: number;
        vote_count?: number;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Country {
    id: string;
    name: string;
    slug: string;
}

export interface EpisodeServer {
    server_name: string;
    server_data: Episode[];
}

export interface Episode {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
}

export interface MovieListResponse {
    status: boolean;
    items: Movie[];
    pathImage: string;
    pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
    };
}

export interface MovieDetailResponse {
    status: boolean;
    msg: string;
    movie: Movie;
    episodes: EpisodeServer[];
}
