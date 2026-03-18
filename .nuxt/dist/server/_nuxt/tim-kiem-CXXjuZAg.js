import { _ as _sfc_main$1, a as _sfc_main$3 } from "./AppPagination-D-_Rm_FC.js";
import { _ as _sfc_main$2 } from "./MovieGrid-D4aFWUrv.js";
import { defineComponent, computed, withAsyncContext, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Filter, Search } from "lucide-vue-next";
import { a as OphimService } from "./ophim-service-BpMmC9L9.js";
import { u as useRoute, a as useRuntimeConfig } from "../server.mjs";
import { u as useAsyncData } from "./asyncData-CmHscAf-.js";
import { a as useSeoMeta, u as useHead } from "./v3-m4Jfmifc.js";
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
  __name: "tim-kiem",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const keyword = computed(
      () => typeof route.query.keyword === "string" ? route.query.keyword.trim() : ""
    );
    const category = computed(
      () => typeof route.query.category === "string" ? route.query.category : ""
    );
    const country = computed(
      () => typeof route.query.country === "string" ? route.query.country : ""
    );
    const year = computed(() => typeof route.query.year === "string" ? route.query.year : "");
    const type = computed(() => typeof route.query.type === "string" ? route.query.type : "");
    const sort = computed(() => typeof route.query.sort === "string" ? route.query.sort : "");
    const page = computed(() => {
      const nextPage = Number(route.query.page);
      return Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
    });
    const hasFilters = computed(
      () => Boolean(category.value || country.value || year.value || type.value || sort.value)
    );
    const isFiltering = computed(() => !keyword.value && hasFilters.value);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "search-movies",
      async () => {
        if (keyword.value) {
          return OphimService.searchMovies(keyword.value, page.value);
        }
        if (hasFilters.value) {
          return OphimService.filterMovies({
            category: category.value,
            country: country.value,
            year: year.value,
            type: type.value,
            sort: sort.value,
            page: page.value
          });
        }
        return null;
      },
      {
        watch: [keyword, category, country, year, type, sort, page]
      }
    )), __temp = await __temp, __restore(), __temp);
    const title = computed(() => {
      if (keyword.value) {
        return `Kết quả tìm kiếm: "${keyword.value}"`;
      }
      if (isFiltering.value) {
        return "Kết quả lọc phim";
      }
      return "Tìm kiếm phim";
    });
    const movies = computed(() => data.value?.items || []);
    const totalItems = computed(() => data.value?.pagination?.totalItems || 0);
    const canonicalUrl = computed(
      () => new URL("/tim-kiem", runtimeConfig.public.siteUrl).toString()
    );
    const extraParams = computed(() => {
      const params = {};
      if (keyword.value) {
        params.keyword = keyword.value;
      }
      if (category.value) {
        params.category = category.value;
      }
      if (country.value) {
        params.country = country.value;
      }
      if (year.value) {
        params.year = year.value;
      }
      if (type.value) {
        params.type = type.value;
      }
      if (sort.value) {
        params.sort = sort.value;
      }
      return params;
    });
    useSeoMeta({
      title: () => keyword.value ? `Tim kiem: ${keyword.value} - Phimhayz.site` : "Loc phim - Phimhayz.site",
      description: () => "Tim kiem phim bo, phim le va cac phim moi cap nhat tren Phimhayz.site."
    });
    useHead(() => ({
      link: [
        {
          rel: "canonical",
          href: canonicalUrl.value
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieFilter = _sfc_main$1;
      const _component_MovieGrid = _sfc_main$2;
      const _component_AppPagination = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background-dark pb-20 pt-24" }, _attrs))}><div class="container mx-auto px-4"><h1 class="mb-6 border-l-4 border-cyan-400 pl-4 text-2xl font-bold text-white">${ssrInterpolate(unref(title))}</h1>`);
      _push(ssrRenderComponent(_component_MovieFilter, null, null, _parent));
      if (unref(data)) {
        _push(`<div class="mb-8 flex items-center gap-2"><div class="h-6 w-1 rounded-full bg-cyan-400"></div><h2 class="text-lg font-medium text-white"> Kết quả: <span class="font-bold text-cyan-400">${ssrInterpolate(unref(totalItems))}</span> phim </h2></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(keyword) || unref(isFiltering)) {
        _push(`<!--[-->`);
        if (unref(movies).length) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_MovieGrid, {
            "class-name": "mb-12",
            movies: unref(movies)
          }, null, _parent));
          if (unref(data)?.pagination && Number(unref(data).pagination.totalPages) > 1) {
            _push(ssrRenderComponent(_component_AppPagination, {
              "base-url": "/tim-kiem",
              "current-page": Number(unref(data).pagination.currentPage),
              "extra-params": unref(extraParams),
              "total-pages": Number(unref(data).pagination.totalPages)
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<div class="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-20 text-gray-400"><div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">`);
          if (unref(isFiltering)) {
            _push(ssrRenderComponent(unref(Filter), { class: "h-8 w-8 text-cyan-400" }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(Search), { class: "h-8 w-8 text-gray-500" }, null, _parent));
          }
          _push(`</div><p class="mb-2 text-lg font-medium text-white">Không tìm thấy phim nào phù hợp.</p><p class="text-sm">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-32 text-gray-400"><div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">`);
        _push(ssrRenderComponent(unref(Search), { class: "h-10 w-10 text-gray-500" }, null, _parent));
        _push(`</div><h2 class="mb-2 text-2xl font-bold text-white">Tìm kiếm phim</h2><p class="max-w-md text-center text-gray-400"> Nhập tên phim vào thanh tìm kiếm hoặc dùng bộ lọc bên trên để tìm phim yêu thích. </p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tim-kiem.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=tim-kiem-CXXjuZAg.js.map
