const OPhimUtils = {
  cleanContent(content) {
    if (!content) {
      return "";
    }
    return content.replace(/<[^>]*>?/gm, "");
  },
  getPosterUrl(path) {
    if (!path) {
      return "/images/logo2.png";
    }
    if (path.startsWith("http")) {
      return path;
    }
    return `https://img.ophim.live/uploads/movies/${path}`;
  },
  getThumbUrl(path) {
    if (!path) {
      return "/images/logo2.png";
    }
    if (path.startsWith("http")) {
      return path;
    }
    return `https://img.ophim.live/uploads/movies/${path}`;
  },
  formatDuration(time) {
    if (!time) {
      return "N/A";
    }
    return time.replace("phút", " min");
  }
};
const API_HOST = "https://ophim1.com";
function normalizeListResponse(data) {
  if (data?.data?.items) {
    return {
      status: Boolean(data.status),
      items: data.data.items,
      pathImage: data.data.APP_DOMAIN_CDN_IMAGE || "",
      pagination: {
        ...data.data.params?.pagination,
        totalPages: Math.ceil(
          (data.data.params?.pagination?.totalItems || 0) / (data.data.params?.pagination?.totalItemsPerPage || 1)
        )
      }
    };
  }
  if (data?.items) {
    return data;
  }
  return null;
}
function normalizeDetailResponse(data) {
  if (data?.data?.item) {
    return {
      status: data.status === true || data.status === "success",
      msg: data.msg || "",
      movie: data.data.item,
      episodes: data.data.item.episodes || []
    };
  }
  if (data?.movie) {
    return data;
  }
  return null;
}
async function fetchJson(url, noStore = false) {
  const response = await fetch(url, {
    cache: noStore ? "no-store" : "default"
  });
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }
  return response.json();
}
const OphimService = {
  async getHomeMovies(page = 1) {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/danh-sach/phim-moi-cap-nhat?page=${page}`
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("getHomeMovies error:", error);
      return null;
    }
  },
  async getMoviesByCategory(type, page = 1) {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/danh-sach/${type}?page=${page}`
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("getMoviesByCategory error:", error);
      return null;
    }
  },
  async getMovieBySlug(slug) {
    try {
      const data = await fetchJson(`${API_HOST}/v1/api/phim/${slug}`, true);
      return normalizeDetailResponse(data);
    } catch (error) {
      console.error("getMovieBySlug error:", error);
      return null;
    }
  },
  async searchMovies(keyword, page = 1) {
    try {
      const data = await fetchJson(
        `${API_HOST}/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}`,
        true
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("searchMovies error:", error);
      return null;
    }
  },
  async filterMovies(params) {
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
        `${API_HOST}/v1/api/danh-sach/${endpoint}?${queryParams.toString()}`
      );
      return normalizeListResponse(data);
    } catch (error) {
      console.error("filterMovies error:", error);
      return null;
    }
  }
};
export {
  OPhimUtils as O,
  OphimService as a
};
//# sourceMappingURL=ophim-service-BpMmC9L9.js.map
