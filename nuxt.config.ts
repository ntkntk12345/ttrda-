export default defineNuxtConfig({
  compatibilityDate: "2026-03-18",
  srcDir: "src/",
  telemetry: false,
  devtools: {
    enabled: false,
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  serverDir: "server",
  dir: {
    public: "../public",
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "vi",
      },
      title: "Phimhayz.site - Xem phim online chat luong cao",
      meta: [
        {
          name: "description",
          content:
            "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
        },
        {
          property: "og:title",
          content: "Phimhayz.site - Xem phim online chat luong cao",
        },
        {
          property: "og:description",
          content:
            "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
        },
        {
          property: "og:site_name",
          content: "Phimhayz.site",
        },
        {
          property: "og:locale",
          content: "vi_VN",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:title",
          content: "Phimhayz.site - Xem phim online chat luong cao",
        },
        {
          name: "twitter:description",
          content:
            "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://phimhayz.site",
    },
  },
  typescript: {
    strict: true,
    typeCheck: "build",
  },
});
