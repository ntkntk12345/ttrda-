import { _ as __nuxt_component_0 } from "./nuxt-link-2k-Xgjf3.js";
import { c as cn } from "./cn-H80jjgLf.js";
import { defineComponent, ref, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
import { publicAssetsURL } from "#internal/nuxt/paths";
import { Search, Bell, User, X, Menu } from "lucide-vue-next";
import { u as useRoute, d as useRouter, _ as _export_sfc } from "../server.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ufo/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/defu/dist/defu.mjs";
import "clsx";
import "tailwind-merge";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ofetch/dist/node.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/hookable/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/unctx/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/h3/dist/index.mjs";
import "vue-router";
const _imports_0 = publicAssetsURL("/images/phimhay.jpg");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SiteHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const navLinks = [
      { name: "Trang chủ", href: "/" },
      { name: "Phim bộ", href: "/danh-sach/phim-bo" },
      { name: "Phim lẻ", href: "/danh-sach/phim-le" },
      { name: "Hoạt hình", href: "/danh-sach/hoat-hinh" },
      { name: "TV Shows", href: "/danh-sach/tv-shows" }
    ];
    const route = useRoute();
    useRouter();
    const isScrolled = ref(false);
    const isMobileMenuOpen = ref(false);
    const isMobileSearchOpen = ref(false);
    const searchQuery = ref(
      typeof route.query.keyword === "string" ? route.query.keyword : ""
    );
    watch(
      () => route.fullPath,
      () => {
        isMobileMenuOpen.value = false;
        isMobileSearchOpen.value = false;
        searchQuery.value = typeof route.query.keyword === "string" ? route.query.keyword : "";
      }
    );
    watch(isMobileMenuOpen, (isOpen) => {
      {
        return;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          unref(isScrolled) ? "bg-background-dark/95 py-3 shadow-lg backdrop-blur-md" : "bg-transparent py-5"
        )
      }, _attrs))}><div class="container mx-auto flex items-center justify-between px-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "group z-50 flex items-center",
        to: "/"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img alt="Phimhayz.site" class="h-14 w-14 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16" height="64"${ssrRenderAttr("src", _imports_0)} width="64"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                alt: "Phimhayz.site",
                class: "h-14 w-14 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16",
                height: "64",
                src: _imports_0,
                width: "64"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden items-center gap-8 md:flex"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.href,
          class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
            "group relative text-sm font-medium transition-colors hover:text-primary",
            unref(route).path === link.href ? "text-primary" : "text-gray-300"
          ),
          to: link.href
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)} <span class="${ssrRenderClass(
                ("cn" in _ctx ? _ctx.cn : unref(cn))(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  unref(route).path === link.href ? "w-full" : "w-0"
                )
              )}"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name) + " ", 1),
                createVNode("span", {
                  class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    unref(route).path === link.href ? "w-full" : "w-0"
                  )
                }, null, 2)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="flex items-center gap-4"><form class="hidden items-center rounded-full border border-white/10 bg-card-dark/50 px-4 py-1.5 transition-all focus-within:border-primary/50 focus-within:bg-card-dark lg:flex">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-4 w-4 text-gray-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} class="ml-2 w-48 border-none bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none" placeholder="Tìm kiếm phim..." type="text"></form><button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background-dark/75 text-gray-300 shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:text-white lg:hidden" type="button">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-5 w-5" }, null, _parent));
      _push(`</button><button class="relative p-2 text-gray-300 hover:text-white" type="button">`);
      _push(ssrRenderComponent(unref(Bell), { class: "h-5 w-5" }, null, _parent));
      _push(`<span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-background-dark bg-red-500"></span></button><button class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-gray-700 to-gray-600" type="button">`);
      _push(ssrRenderComponent(unref(User), { class: "h-4 w-4 text-gray-300" }, null, _parent));
      _push(`</button><button class="${ssrRenderClass(
        ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg shadow-black/30 backdrop-blur-md transition-colors md:hidden",
          unref(isMobileMenuOpen) ? "border-primary bg-primary text-slate-950" : "border-white/10 bg-background-dark/80 text-gray-100 hover:text-white"
        )
      )}" type="button">`);
      if (unref(isMobileMenuOpen)) {
        _push(ssrRenderComponent(unref(X), { class: "h-6 w-6" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Menu), { class: "h-6 w-6" }, null, _parent));
      }
      _push(`</button></div></div><div class="${ssrRenderClass(
        ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "overflow-hidden border-t border-white/5 bg-background-dark/95 px-4 transition-all duration-300 md:hidden",
          unref(isMobileSearchOpen) ? "max-h-28 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        )
      )}"><form class="flex items-center rounded-full border border-white/10 bg-card-dark px-4 py-3">`);
      _push(ssrRenderComponent(unref(Search), { class: "h-5 w-5 text-gray-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(searchQuery))} autofocus class="ml-3 w-full border-none bg-transparent text-base text-white focus:outline-none" placeholder="Tìm kiếm phim..." type="text"></form></div><button class="${ssrRenderClass(
        ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden",
          unref(isMobileMenuOpen) ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )
      )}" aria-label="Dong menu" type="button"></button><div class="${ssrRenderClass(
        ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "fixed inset-y-0 right-0 z-[60] flex w-full max-w-[22rem] flex-col gap-6 border-l border-white/10 bg-[linear-gradient(180deg,rgba(4,7,20,0.98),rgba(6,12,30,0.96))] px-6 pb-8 pt-24 shadow-[0_25px_80px_rgba(0,0,0,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          unref(isMobileMenuOpen) ? "translate-x-0 scale-100 opacity-100" : "pointer-events-none translate-x-8 scale-[0.985] opacity-0"
        )
      )}"><div class="flex items-center justify-between"><div><p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80"> Dieu huong </p><p class="mt-2 text-sm text-gray-400">Chon nhanh danh muc phim ban muon xem.</p></div><button class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-all hover:border-primary/40 hover:bg-white/10 hover:text-white" aria-label="Dong menu" type="button">`);
      _push(ssrRenderComponent(unref(X), { class: "h-5 w-5" }, null, _parent));
      _push(`</button></div><nav class="flex flex-col gap-3"><!--[-->`);
      ssrRenderList(navLinks, (link, index) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.href,
          class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
            "rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-lg font-medium transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06] hover:text-primary",
            unref(isMobileMenuOpen) ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
            unref(route).path === link.href ? "text-primary" : "text-gray-300"
          ),
          style: { transitionDelay: unref(isMobileMenuOpen) ? `${index * 45}ms` : "0ms" },
          to: link.href
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SiteHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "border-t border-white/5 bg-card-dark pb-8 pt-16 text-sm text-gray-400" }, _attrs))}><div class="container mx-auto px-4"><div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4"><div class="mb-8">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "inline-flex items-center",
    to: "/"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img alt="Phimhayz.site" class="h-24 w-24 rounded-full border border-white/10 object-cover shadow-[0_0_36px_rgba(34,211,238,0.2)]" height="96"${ssrRenderAttr("src", _imports_0)} width="96"${_scopeId}>`);
      } else {
        return [
          createVNode("img", {
            alt: "Phimhayz.site",
            class: "h-24 w-24 rounded-full border border-white/10 object-cover shadow-[0_0_36px_rgba(34,211,238,0.2)]",
            height: "96",
            src: _imports_0,
            width: "96"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<p class="mt-4 max-w-xs text-sm leading-relaxed text-gray-400"> Kho phim online cập nhật nhanh, giao diện gọn gàng và trải nghiệm xem phim mượt trên cả điện thoại lẫn máy tính. </p></div><div><h4 class="mb-6 font-semibold text-white">Khám phá</h4><ul class="space-y-3"><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "transition-colors hover:text-primary",
    to: "/danh-sach/phim-le"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Phim lẻ`);
      } else {
        return [
          createTextVNode("Phim lẻ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "transition-colors hover:text-primary",
    to: "/danh-sach/phim-bo"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Phim bộ`);
      } else {
        return [
          createTextVNode("Phim bộ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "transition-colors hover:text-primary",
    to: "/danh-sach/hoat-hinh"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Hoạt hình`);
      } else {
        return [
          createTextVNode("Hoạt hình")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    class: "transition-colors hover:text-primary",
    to: "/danh-sach/tv-shows"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`TV Shows`);
      } else {
        return [
          createTextVNode("TV Shows")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></div><div><h4 class="mb-6 font-semibold text-white">Hỗ trợ</h4><ul class="space-y-3"><li><a class="transition-colors hover:text-primary" href="#">Liên hệ</a></li><li><a class="transition-colors hover:text-primary" href="#">FAQ</a></li><li><a class="transition-colors hover:text-primary" href="#">Điều khoản sử dụng</a></li><li><a class="transition-colors hover:text-primary" href="#">Chính sách bảo mật</a></li></ul></div><div><h4 class="mb-6 font-semibold text-white">Nhận phim mới</h4><p class="mb-4">Đăng ký để theo dõi các phim mới cập nhật mỗi tuần.</p><form class="flex"><input class="w-full rounded-l-lg border border-white/10 bg-background-dark px-4 py-2 focus:border-primary/50 focus:outline-none" placeholder="Email của bạn" type="email"><button class="rounded-r-lg bg-primary px-4 py-2 font-medium text-slate-950 transition-colors hover:bg-cyan-300" type="submit"> Gửi </button></form></div></div><div class="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Phimhayz.site. All rights reserved.</p><div class="mt-4 flex gap-6 md:mt-0"><a class="transition-colors hover:text-white" href="#">Facebook</a><a class="transition-colors hover:text-white" href="#">Twitter</a><a class="transition-colors hover:text-white" href="#">Instagram</a></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/SiteFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SiteHeader = _sfc_main$2;
  const _component_SiteFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col bg-background-dark font-display text-white" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_SiteHeader, null, null, _parent));
  _push(`<main class="flex-grow pt-20">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_SiteFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-CkR8ANbf.js.map
