import type { MovieDetailResponse, MovieListResponse } from "~/types/ophim";

const API_HOST = "https://ophim1.com";

function normalizeListResponse(data: any): MovieListResponse | null {
  if (data?.data?.items) {
    return {
      status: Boolean(data.status),
      items: data.data.items,
      pathImage: data.data.APP_DOMAIN_CDN_IMAGE || "",
      pagination: {
        ...data.data.params?.pagination,
        totalPages: Math.ceil(
          (data.data.params?.pagination?.totalItems || 0) /
            (data.data.params?.pagination?.totalItemsPerPage || 1),
        ),
      },
    };
  }

  if (data?.items) {
    return data as MovieListResponse;
  }

  return null;
}

function normalizeDetailResponse(data: any): MovieDetailResponse | null {
  if (data?.data?.item) {
    return {
      status: data.status === true || data.status === "success",
      msg: data.msg || "",
      movie: data.data.item,
      episodes: data.data.item.episodes || [],
    };
  }

  if (data?.movie) {
    return data as MovieDetailResponse;
  }

  return null;
}

async function fetchJson(url: string, noStore = false) {
  const response = await fetch(url, {
    cache: noStore ? "no-store" : "default",
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  return response.json();
}

export const OphimService = {
  async getHomeMovies(page = 1): Promise<MovieListResponse | null> {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?page=${page}`,
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("getHomeMovies error:", error);
      return null;
    }
  },

  async getMoviesByCategory(
    type: string,
    page = 1,
  ): Promise<MovieListResponse | null> {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/danh-sach/${type}?page=${page}`,
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("getMoviesByCategory error:", error);
      return null;
    }
  },

  async getMovieBySlug(slug: string): Promise<MovieDetailResponse | null> {
    try {
      const data = await fetchJson(`${API_HOST}/v1/api/phim/${slug}`, true);
      return normalizeDetailResponse(data);
    } catch (error) {
      console.error("getMovieBySlug error:", error);
      return null;
    }
  },

  async searchMovies(
    keyword: string,
    page = 1,
  ): Promise<MovieListResponse | null> {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
        true,
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("searchMovies error:", error);
      return null;
    }
  },

  async filterMovies(params: {
    category?: string;
    country?: string;
    year?: string;
    type?: string;
    sort?: string;
    page?: number;
  }): Promise<MovieListResponse | null> {
    try {
      const queryParams = new URLSearchParams();

      if (params.category) {
        queryParams.set("category", params.category);
      }
      if (params.country) {
        queryParams.set("country", params.country);
      }
      if (params.year) {
        queryParams.set("year", params.year);
      }
      if (params.sort) {
        queryParams.set("sort", params.sort);
      }

      queryParams.set("page", String(params.page || 1));

      const endpoint = params.type || "phim-moi-cap-nhat";
      const data = await fetchJson(
        `${API_HOST}/v1/api/danh-sach/${endpoint}?${queryParams.toString()}`,
      );

      return normalizeListResponse(data);
    } catch (error) {
      console.error("filterMovies error:", error);
      return null;
    }
  },
};
