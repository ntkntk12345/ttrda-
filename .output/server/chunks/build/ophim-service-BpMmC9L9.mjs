globalThis.__timing__.logStart('Load chunks/build/ophim-service-BpMmC9L9');const OPhimUtils = {
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
    return time.replace("ph\xFAt", " min");
  }
};
const API_HOST = "https://ophim1.com";
function normalizeListResponse(data) {
  var _a, _b, _c, _d, _e, _f;
  if ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.items) {
    return {
      status: Boolean(data.status),
      items: data.data.items,
      pathImage: data.data.APP_DOMAIN_CDN_IMAGE || "",
      pagination: {
        ...(_b = data.data.params) == null ? void 0 : _b.pagination,
        totalPages: Math.ceil(
          (((_d = (_c = data.data.params) == null ? void 0 : _c.pagination) == null ? void 0 : _d.totalItems) || 0) / (((_f = (_e = data.data.params) == null ? void 0 : _e.pagination) == null ? void 0 : _f.totalItemsPerPage) || 1)
        )
      }
    };
  }
  if (data == null ? void 0 : data.items) {
    return data;
  }
  return null;
}
function normalizeDetailResponse(data) {
  var _a;
  if ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.item) {
    return {
      status: data.status === true || data.status === "success",
      msg: data.msg || "",
      movie: data.data.item,
      episodes: data.data.item.episodes || []
    };
  }
  if (data == null ? void 0 : data.movie) {
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

export { OphimService as O, OPhimUtils as a };;globalThis.__timing__.logEnd('Load chunks/build/ophim-service-BpMmC9L9');
//# sourceMappingURL=ophim-service-BpMmC9L9.mjs.map
