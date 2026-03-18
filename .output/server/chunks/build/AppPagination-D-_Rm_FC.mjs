globalThis.__timing__.logStart('Load chunks/build/AppPagination-D-_Rm_FC');import { defineComponent, reactive, watch, mergeProps, unref, computed, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { Filter, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { u as useRoute, d as useRouter } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-2k-Xgjf3.mjs';
import { c as cn } from './cn-H80jjgLf.mjs';

const CATEGORY_TITLES = {
  "phim-bo": "Phim b\u1ED9",
  "phim-le": "Phim l\u1EBB",
  "hoat-hinh": "Phim ho\u1EA1t h\xECnh",
  "tv-shows": "TV Shows",
  "phim-moi-cap-nhat": "Phim m\u1EDBi c\u1EADp nh\u1EADt",
  "phim-vietsub": "Phim Vietsub",
  "phim-thuyet-minh": "Phim thuy\u1EBFt minh",
  "phim-long-tieng": "Phim l\u1ED3ng ti\u1EBFng",
  "phim-bo-dang-chieu": "Phim b\u1ED9 \u0111ang chi\u1EBFu",
  "phim-bo-hoan-thanh": "Phim b\u1ED9 ho\xE0n th\xE0nh",
  "phim-sap-chieu": "Phim s\u1EAFp chi\u1EBFu",
  subteam: "Subteam",
  action: "H\xE0nh \u0111\u1ED9ng",
  adventure: "Phi\xEAu l\u01B0u",
  horror: "Kinh d\u1ECB",
  comedy: "H\xE0i h\u01B0\u1EDBc",
  romance: "T\xECnh c\u1EA3m",
  drama: "T\xE2m l\xFD",
  fantasy: "Vi\u1EC5n t\u01B0\u1EDFng",
  "science-fiction": "Khoa h\u1ECDc",
  mystery: "B\xED \u1EA9n",
  thriller: "Gi\u1EADt g\xE2n",
  crime: "H\xECnh s\u1EF1",
  war: "Chi\u1EBFn tranh",
  history: "L\u1ECBch s\u1EED",
  music: "\xC2m nh\u1EA1c",
  family: "Gia \u0111\xECnh",
  documentary: "T\xE0i li\u1EC7u",
  sport: "Th\u1EC3 thao",
  animation: "Ho\u1EA1t h\xECnh",
  musical: "Nh\u1EA1c k\u1ECBch",
  biography: "Ti\u1EC3u s\u1EED",
  western: "Mi\u1EC1n T\xE2y"
};
const FILTER_CATEGORIES = [
  { value: "", label: "T\u1EA5t c\u1EA3 th\u1EC3 lo\u1EA1i" },
  { value: "hanh-dong", label: "H\xE0nh \u0111\u1ED9ng" },
  { value: "tinh-cam", label: "T\xECnh c\u1EA3m" },
  { value: "hai-huoc", label: "H\xE0i h\u01B0\u1EDBc" },
  { value: "co-trang", label: "C\u1ED5 trang" },
  { value: "tam-ly", label: "T\xE2m l\xFD" },
  { value: "hinh-su", label: "H\xECnh s\u1EF1" },
  { value: "chien-tranh", label: "Chi\u1EBFn tranh" },
  { value: "the-thao", label: "Th\u1EC3 thao" },
  { value: "vo-thuat", label: "V\xF5 thu\u1EADt" },
  { value: "vien-tuong", label: "Vi\u1EC5n t\u01B0\u1EDFng" },
  { value: "phieu-luu", label: "Phi\xEAu l\u01B0u" },
  { value: "khoa-hoc", label: "Khoa h\u1ECDc" },
  { value: "kinh-di", label: "Kinh d\u1ECB" },
  { value: "am-nhac", label: "\xC2m nh\u1EA1c" },
  { value: "than-thoai", label: "Th\u1EA7n tho\u1EA1i" },
  { value: "tai-lieu", label: "T\xE0i li\u1EC7u" },
  { value: "gia-dinh", label: "Gia \u0111\xECnh" }
];
const FILTER_COUNTRIES = [
  { value: "", label: "T\u1EA5t c\u1EA3 qu\u1ED1c gia" },
  { value: "trung-quoc", label: "Trung Qu\u1ED1c" },
  { value: "han-quoc", label: "H\xE0n Qu\u1ED1c" },
  { value: "nhat-ban", label: "Nh\u1EADt B\u1EA3n" },
  { value: "my", label: "M\u1EF9" },
  { value: "thai-lan", label: "Th\xE1i Lan" },
  { value: "viet-nam", label: "Vi\u1EC7t Nam" },
  { value: "an-do", label: "\u1EA4n \u0110\u1ED9" },
  { value: "hong-kong", label: "H\u1ED3ng K\xF4ng" },
  { value: "dai-loan", label: "\u0110\xE0i Loan" },
  { value: "au-my", label: "\xC2u M\u1EF9" }
];
const FILTER_TYPES = [
  { value: "", label: "T\u1EA5t c\u1EA3 t\xECnh tr\u1EA1ng" },
  { value: "phim-le", label: "Phim l\u1EBB" },
  { value: "phim-bo", label: "Phim b\u1ED9" },
  { value: "hoat-hinh", label: "Ho\u1EA1t h\xECnh" },
  { value: "tv-shows", label: "TV Shows" }
];
const FILTER_SORTS = [
  { value: "modified.time", label: "M\u1EDBi nh\u1EA5t" },
  { value: "year", label: "N\u0103m ph\xE1t h\xE0nh" },
  { value: "view", label: "Xem nhi\u1EC1u" }
];
const FILTER_YEARS = [
  { value: "", label: "T\u1EA5t c\u1EA3 n\u0103m" },
  ...Array.from({ length: 15 }, (_, index) => {
    const year = String((/* @__PURE__ */ new Date()).getFullYear() - index);
    return {
      value: year,
      label: year
    };
  })
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MovieFilter",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const filters = reactive({
      category: "",
      country: "",
      year: "",
      type: "",
      sort: "modified.time"
    });
    function syncFiltersFromRoute() {
      filters.category = typeof route.query.category === "string" ? route.query.category : "";
      filters.country = typeof route.query.country === "string" ? route.query.country : "";
      filters.year = typeof route.query.year === "string" ? route.query.year : "";
      filters.type = typeof route.query.type === "string" ? route.query.type : "";
      filters.sort = typeof route.query.sort === "string" ? route.query.sort : "modified.time";
    }
    watch(
      () => route.query,
      () => syncFiltersFromRoute(),
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8 rounded-xl border border-white/5 bg-[#0f172a]/50 p-4 backdrop-blur-sm" }, _attrs))}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Th\u1EC3 lo\u1EA1i</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_CATEGORIES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, option.value) : ssrLooseEqual(unref(filters).category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Qu\u1ED1c gia</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_COUNTRIES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).country) ? ssrLooseContain(unref(filters).country, option.value) : ssrLooseEqual(unref(filters).country, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">N\u0103m</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_YEARS), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).year) ? ssrLooseContain(unref(filters).year, option.value) : ssrLooseEqual(unref(filters).year, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">T\xECnh tr\u1EA1ng</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_TYPES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).type) ? ssrLooseContain(unref(filters).type, option.value) : ssrLooseEqual(unref(filters).type, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">S\u1EAFp x\u1EBFp</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_SORTS), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sort) ? ssrLooseContain(unref(filters).sort, option.value) : ssrLooseEqual(unref(filters).sort, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="flex items-end"><button class="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-400/20 transition-colors hover:bg-cyan-300" type="button">`);
      _push(ssrRenderComponent(unref(Filter), { class: "h-4 w-4" }, null, _parent));
      _push(` L\u1ECDc phim </button></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/MovieFilter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    totalPages: {},
    baseUrl: {},
    extraParams: {},
    className: {}
  },
  setup(__props) {
    const props = __props;
    function buildUrl(page) {
      const params = new URLSearchParams(props.extraParams || {});
      params.set("page", String(page));
      return `${props.baseUrl}?${params.toString()}`;
    }
    const pageItems = computed(() => {
      const items = [];
      const maxVisiblePages = 5;
      let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
      if (startPage > 1) {
        items.push(1);
        if (startPage > 2) {
          items.push("dots-start");
        }
      }
      for (let page = startPage; page <= endPage; page += 1) {
        items.push(page);
      }
      if (endPage < props.totalPages) {
        if (endPage < props.totalPages - 1) {
          items.push("dots-end");
        }
        items.push(props.totalPages);
      }
      return items;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.totalPages > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
            "mb-8 mt-12 flex select-none items-center justify-center gap-2",
            __props.className
          )
        }, _attrs))}>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
            "flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 font-medium text-gray-400 transition-all",
            __props.currentPage === 1 ? "pointer-events-none opacity-50" : "hover:border-white/20 hover:bg-white/10 hover:text-white"
          ),
          to: __props.currentPage > 1 ? buildUrl(__props.currentPage - 1) : "#"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`<span class="hidden sm:inline"${_scopeId}>Trang tr\u01B0\u1EDBc</span>`);
            } else {
              return [
                createVNode(unref(ChevronLeft), { class: "h-4 w-4" }),
                createVNode("span", { class: "hidden sm:inline" }, "Trang tr\u01B0\u1EDBc")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center gap-2"><!--[-->`);
        ssrRenderList(unref(pageItems), (item) => {
          _push(`<!--[-->`);
          if (typeof item === "string") {
            _push(`<span class="flex h-10 w-10 items-center justify-center text-gray-500"> ... </span>`);
          } else {
            _push(ssrRenderComponent(_component_NuxtLink, {
              class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
                "flex h-10 w-10 items-center justify-center rounded-lg border font-medium transition-all",
                item === __props.currentPage ? "pointer-events-none scale-105 border-cyan-500 bg-cyan-500 font-bold text-black shadow-lg shadow-cyan-500/20" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white"
              ),
              to: buildUrl(item)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
            "flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 font-medium text-gray-400 transition-all",
            __props.currentPage === __props.totalPages ? "pointer-events-none opacity-50" : "hover:border-white/20 hover:bg-white/10 hover:text-white"
          ),
          to: __props.currentPage < __props.totalPages ? buildUrl(__props.currentPage + 1) : "#"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden sm:inline"${_scopeId}>Trang sau</span>`);
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("span", { class: "hidden sm:inline" }, "Trang sau"),
                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/AppPagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { CATEGORY_TITLES as C, _sfc_main$1 as _, _sfc_main as a };;globalThis.__timing__.logEnd('Load chunks/build/AppPagination-D-_Rm_FC');
//# sourceMappingURL=AppPagination-D-_Rm_FC.mjs.map
