import { defineComponent, reactive, watch, mergeProps, unref, useSSRContext, computed, withCtx, createVNode, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { Filter, ChevronLeft, ChevronRight } from "lucide-vue-next";
import { u as useRoute, d as useRouter } from "../server.mjs";
import { _ as __nuxt_component_0 } from "./nuxt-link-2k-Xgjf3.js";
import { c as cn } from "./cn-H80jjgLf.js";
const CATEGORY_TITLES = {
  "phim-bo": "Phim bộ",
  "phim-le": "Phim lẻ",
  "hoat-hinh": "Phim hoạt hình",
  "tv-shows": "TV Shows",
  "phim-moi-cap-nhat": "Phim mới cập nhật",
  "phim-vietsub": "Phim Vietsub",
  "phim-thuyet-minh": "Phim thuyết minh",
  "phim-long-tieng": "Phim lồng tiếng",
  "phim-bo-dang-chieu": "Phim bộ đang chiếu",
  "phim-bo-hoan-thanh": "Phim bộ hoàn thành",
  "phim-sap-chieu": "Phim sắp chiếu",
  subteam: "Subteam",
  action: "Hành động",
  adventure: "Phiêu lưu",
  horror: "Kinh dị",
  comedy: "Hài hước",
  romance: "Tình cảm",
  drama: "Tâm lý",
  fantasy: "Viễn tưởng",
  "science-fiction": "Khoa học",
  mystery: "Bí ẩn",
  thriller: "Giật gân",
  crime: "Hình sự",
  war: "Chiến tranh",
  history: "Lịch sử",
  music: "Âm nhạc",
  family: "Gia đình",
  documentary: "Tài liệu",
  sport: "Thể thao",
  animation: "Hoạt hình",
  musical: "Nhạc kịch",
  biography: "Tiểu sử",
  western: "Miền Tây"
};
const FILTER_CATEGORIES = [
  { value: "", label: "Tất cả thể loại" },
  { value: "hanh-dong", label: "Hành động" },
  { value: "tinh-cam", label: "Tình cảm" },
  { value: "hai-huoc", label: "Hài hước" },
  { value: "co-trang", label: "Cổ trang" },
  { value: "tam-ly", label: "Tâm lý" },
  { value: "hinh-su", label: "Hình sự" },
  { value: "chien-tranh", label: "Chiến tranh" },
  { value: "the-thao", label: "Thể thao" },
  { value: "vo-thuat", label: "Võ thuật" },
  { value: "vien-tuong", label: "Viễn tưởng" },
  { value: "phieu-luu", label: "Phiêu lưu" },
  { value: "khoa-hoc", label: "Khoa học" },
  { value: "kinh-di", label: "Kinh dị" },
  { value: "am-nhac", label: "Âm nhạc" },
  { value: "than-thoai", label: "Thần thoại" },
  { value: "tai-lieu", label: "Tài liệu" },
  { value: "gia-dinh", label: "Gia đình" }
];
const FILTER_COUNTRIES = [
  { value: "", label: "Tất cả quốc gia" },
  { value: "trung-quoc", label: "Trung Quốc" },
  { value: "han-quoc", label: "Hàn Quốc" },
  { value: "nhat-ban", label: "Nhật Bản" },
  { value: "my", label: "Mỹ" },
  { value: "thai-lan", label: "Thái Lan" },
  { value: "viet-nam", label: "Việt Nam" },
  { value: "an-do", label: "Ấn Độ" },
  { value: "hong-kong", label: "Hồng Kông" },
  { value: "dai-loan", label: "Đài Loan" },
  { value: "au-my", label: "Âu Mỹ" }
];
const FILTER_TYPES = [
  { value: "", label: "Tất cả tình trạng" },
  { value: "phim-le", label: "Phim lẻ" },
  { value: "phim-bo", label: "Phim bộ" },
  { value: "hoat-hinh", label: "Hoạt hình" },
  { value: "tv-shows", label: "TV Shows" }
];
const FILTER_SORTS = [
  { value: "modified.time", label: "Mới nhất" },
  { value: "year", label: "Năm phát hành" },
  { value: "view", label: "Xem nhiều" }
];
const FILTER_YEARS = [
  { value: "", label: "Tất cả năm" },
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8 rounded-xl border border-white/5 bg-[#0f172a]/50 p-4 backdrop-blur-sm" }, _attrs))}><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Thể loại</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_CATEGORIES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).category) ? ssrLooseContain(unref(filters).category, option.value) : ssrLooseEqual(unref(filters).category, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Quốc gia</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_COUNTRIES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).country) ? ssrLooseContain(unref(filters).country, option.value) : ssrLooseEqual(unref(filters).country, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Năm</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_YEARS), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).year) ? ssrLooseContain(unref(filters).year, option.value) : ssrLooseEqual(unref(filters).year, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Tình trạng</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_TYPES), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).type) ? ssrLooseContain(unref(filters).type, option.value) : ssrLooseEqual(unref(filters).type, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="space-y-1.5"><label class="ml-1 text-xs font-medium uppercase text-gray-500">Sắp xếp</label><div class="relative"><select class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"><!--[-->`);
      ssrRenderList(unref(FILTER_SORTS), (option) => {
        _push(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(filters).sort) ? ssrLooseContain(unref(filters).sort, option.value) : ssrLooseEqual(unref(filters).sort, option.value)) ? " selected" : ""}>${ssrInterpolate(option.label)}</option>`);
      });
      _push(`<!--]--></select><div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><svg fill="none" height="6" viewBox="0 0 10 6" width="10"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg></div></div></div><div class="flex items-end"><button class="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-400/20 transition-colors hover:bg-cyan-300" type="button">`);
      _push(ssrRenderComponent(unref(Filter), { class: "h-4 w-4" }, null, _parent));
      _push(` Lọc phim </button></div></div></div>`);
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
              _push2(`<span class="hidden sm:inline"${_scopeId}>Trang trước</span>`);
            } else {
              return [
                createVNode(unref(ChevronLeft), { class: "h-4 w-4" }),
                createVNode("span", { class: "hidden sm:inline" }, "Trang trước")
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
export {
  CATEGORY_TITLES as C,
  _sfc_main$1 as _,
  _sfc_main as a
};
//# sourceMappingURL=AppPagination-D-_Rm_FC.js.map
