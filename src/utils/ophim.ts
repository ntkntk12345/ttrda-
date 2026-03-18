export const OPhimUtils = {
  cleanContent(content: string) {
    if (!content) {
      return "";
    }

    return content.replace(/<[^>]*>?/gm, "");
  },

  getPosterUrl(path: string) {
    if (!path) {
      return "/images/logo2.png";
    }

    if (path.startsWith("http")) {
      return path;
    }

    return `https://img.ophim.live/uploads/movies/${path}`;
  },

  getThumbUrl(path: string) {
    if (!path) {
      return "/images/logo2.png";
    }

    if (path.startsWith("http")) {
      return path;
    }

    return `https://img.ophim.live/uploads/movies/${path}`;
  },

  formatDuration(time?: string) {
    if (!time) {
      return "N/A";
    }

    return time.replace("phút", " min");
  },
};
