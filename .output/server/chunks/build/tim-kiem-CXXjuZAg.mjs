globalThis.__timing__.logStart('Load chunks/build/tim-kiem-CXXjuZAg');import { _ as _sfc_main$1, a as _sfc_main$3 } from './AppPagination-D-_Rm_FC.mjs';
import { _ as _sfc_main$2 } from './MovieGrid-D4aFWUrv.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { Filter, Search } from 'lucide-vue-next';
import { O as OphimService } from './ophim-service-BpMmC9L9.mjs';
import { u as useRoute, a as useRuntimeConfig } from './server.mjs';
import { u as useAsyncData } from './asyncData-CmHscAf-.mjs';
import { u as useSeoMeta, a as useHead } from './v3-m4Jfmifc.mjs';
import './nuxt-link-2k-Xgjf3.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './cn-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

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
        return `K\u1EBFt qu\u1EA3 t\xECm ki\u1EBFm: "${keyword.value}"`;
      }
      if (isFiltering.value) {
        return "K\u1EBFt qu\u1EA3 l\u1ECDc phim";
      }
      return "T\xECm ki\u1EBFm phim";
    });
    const movies = computed(() => {
      var _a;
      return ((_a = data.value) == null ? void 0 : _a.items) || [];
    });
    const totalItems = computed(() => {
      var _a, _b;
      return ((_b = (_a = data.value) == null ? void 0 : _a.pagination) == null ? void 0 : _b.totalItems) || 0;
    });
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
      var _a;
      const _component_MovieFilter = _sfc_main$1;
      const _component_MovieGrid = _sfc_main$2;
      const _component_AppPagination = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background-dark pb-20 pt-24" }, _attrs))}><div class="container mx-auto px-4"><h1 class="mb-6 border-l-4 border-cyan-400 pl-4 text-2xl font-bold text-white">${ssrInterpolate(unref(title))}</h1>`);
      _push(ssrRenderComponent(_component_MovieFilter, null, null, _parent));
      if (unref(data)) {
        _push(`<div class="mb-8 flex items-center gap-2"><div class="h-6 w-1 rounded-full bg-cyan-400"></div><h2 class="text-lg font-medium text-white"> K\u1EBFt qu\u1EA3: <span class="font-bold text-cyan-400">${ssrInterpolate(unref(totalItems))}</span> phim </h2></div>`);
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
          if (((_a = unref(data)) == null ? void 0 : _a.pagination) && Number(unref(data).pagination.totalPages) > 1) {
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
          _push(`</div><p class="mb-2 text-lg font-medium text-white">Kh\xF4ng t\xECm th\u1EA5y phim n\xE0o ph\xF9 h\u1EE3p.</p><p class="text-sm">H\xE3y th\u1EED \u0111i\u1EC1u ch\u1EC9nh b\u1ED9 l\u1ECDc ho\u1EB7c t\u1EEB kh\xF3a t\xECm ki\u1EBFm.</p></div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex flex-col items-center justify-center py-32 text-gray-400"><div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">`);
        _push(ssrRenderComponent(unref(Search), { class: "h-10 w-10 text-gray-500" }, null, _parent));
        _push(`</div><h2 class="mb-2 text-2xl font-bold text-white">T\xECm ki\u1EBFm phim</h2><p class="max-w-md text-center text-gray-400"> Nh\u1EADp t\xEAn phim v\xE0o thanh t\xECm ki\u1EBFm ho\u1EB7c d\xF9ng b\u1ED9 l\u1ECDc b\xEAn tr\xEAn \u0111\u1EC3 t\xECm phim y\xEAu th\xEDch. </p></div>`);
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/tim-kiem-CXXjuZAg');
//# sourceMappingURL=tim-kiem-CXXjuZAg.mjs.map
