import { getRouterParam, setHeader } from "h3";

const API_HOST = "https://ophim1.com";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Slug is required",
    });
  }

  try {
    const data = await $fetch(`${API_HOST}/v1/api/phim/${slug}`);
    setHeader(event, "Cache-Control", "s-maxage=3600");
    return data;
  } catch (error: any) {
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: "Failed to fetch from OPhim",
    });
  }
});
