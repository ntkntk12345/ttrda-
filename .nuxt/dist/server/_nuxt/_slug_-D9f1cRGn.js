import { C as CATEGORY_TITLES, _ as _sfc_main$1, a as _sfc_main$3 } from "./AppPagination-D-_Rm_FC.js";
import { _ as _sfc_main$2 } from "./MovieGrid-D4aFWUrv.js";
import { defineComponent, computed, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as OphimService } from "./ophim-service-BpMmC9L9.js";
import { u as useRoute, c as createError, a as useRuntimeConfig } from "../server.mjs";
import { u as useAsyncData } from "./asyncData-CmHscAf-.js";
import { a as useSeoMeta, u as useHead } from "./v3-m4Jfmifc.js";
import "lucide-vue-next";
import "./nuxt-link-2k-Xgjf3.js";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ufo/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/defu/dist/defu.mjs";
import "./cn-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/hookable/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/unctx/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/perfect-debounce/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const slug = computed(() => String(route.params.slug || ""));
    const page = computed(() => {
      const nextPage = Number(route.query.page);
      return Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
    });
    const title = computed(() => CATEGORY_TITLES[slug.value] || `Danh sách ${slug.value}`);
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "category-movies",
      async () => {
        const response = await OphimService.getMoviesByCategory(slug.value, page.value);
        if (!response?.items?.length) {
          throw createError({
            statusCode: 404,
            statusMessage: "Không tìm thấy danh sách phim"
          });
        }
        return response;
      },
      {
        watch: [slug, page]
      }
    )), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: () => `${title.value} - Phimhayz.site`,
      description: () => `${title.value} moi nhat, cap nhat lien tuc tren Phimhayz.site.`
    });
    useHead(() => ({
      link: [
        {
          rel: "canonical",
          href: new URL(`/danh-sach/${slug.value}`, runtimeConfig.public.siteUrl).toString()
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieFilter = _sfc_main$1;
      const _component_MovieGrid = _sfc_main$2;
      const _component_AppPagination = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background-dark pb-20 pt-24" }, _attrs))}><div class="container mx-auto px-4"><h1 class="mb-6 border-l-4 border-primary pl-4 text-2xl font-bold text-white">${ssrInterpolate(unref(title))}</h1>`);
      _push(ssrRenderComponent(_component_MovieFilter, null, null, _parent));
      _push(ssrRenderComponent(_component_MovieGrid, {
        "class-name": "mb-12",
        movies: unref(data)?.items || []
      }, null, _parent));
      if (unref(data)?.pagination) {
        _push(ssrRenderComponent(_component_AppPagination, {
          "base-url": `/danh-sach/${unref(slug)}`,
          "current-page": Number(unref(data).pagination.currentPage),
          "total-pages": Math.min(Number(unref(data).pagination.totalPages), 500)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/danh-sach/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-D9f1cRGn.js.map
