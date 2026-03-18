import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext, computed, toValue, watch, withAsyncContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Shield, LogOut, Pencil, Plus, Power, Trash2, ShieldCheck, LockKeyhole } from "lucide-vue-next";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/hookable/dist/index.mjs";
import { getRequestHeaders } from "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/h3/dist/index.mjs";
import { b as useNuxtApp, f as fetchDefaults } from "../server.mjs";
import { hash } from "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ohash/dist/index.mjs";
import { isPlainObject } from "@vue/shared";
import { u as useAsyncData } from "./asyncData-CmHscAf-.js";
import { u as useHead } from "./v3-m4Jfmifc.js";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/defu/dist/defu.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ufo/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/perfect-debounce/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdminDashboard",
  __ssrInlineRender: true,
  props: {
    initialScripts: {}
  },
  setup(__props) {
    const props = __props;
    const emptyForm = () => ({
      name: "",
      description: "",
      placement: "body-end",
      code: "",
      enabled: true
    });
    function sortScripts(scripts2) {
      return [...scripts2].sort((left, right) => {
        return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
      });
    }
    function formatDate(value) {
      return new Intl.DateTimeFormat("vi-VN", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(value));
    }
    const scripts = ref(sortScripts(props.initialScripts));
    const form = reactive(emptyForm());
    const editingId = ref(null);
    const message = ref("");
    const error = ref("");
    const isSaving = ref(false);
    const busyId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8" }, _attrs))}><div class="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur"><div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div class="space-y-4"><div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">`);
      _push(ssrRenderComponent(unref(Shield), { class: "h-4 w-4" }, null, _parent));
      _push(` Bảng điều khiển quảng cáo toàn site </div><div><h1 class="text-3xl font-black text-white sm:text-4xl">Phimhayz.site Admin</h1><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300"> Quản lý script hiển thị trên mọi trang public. Có thể thêm, sửa, xóa, bật hoặc tắt từng đoạn mã quảng cáo mà không cần sửa code tay. </p></div></div><div class="flex flex-wrap items-center gap-3"><div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">${ssrInterpolate(unref(scripts).length)} script </div><button class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10" type="button">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "h-4 w-4" }, null, _parent));
      _push(` Đăng xuất </button></div></div></div><div class="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]"><form class="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.45)]"><div class="flex items-center justify-between"><div><h2 class="text-xl font-bold text-white">${ssrInterpolate(unref(editingId) ? "Sửa script" : "Thêm script mới")}</h2><p class="mt-1 text-sm text-slate-400"> Script sẽ được áp lên mọi trang public, không chèn vào khu admin. </p></div>`);
      if (unref(editingId)) {
        _push(`<button class="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5" type="button"> Hủy sửa </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Tên script</span><input${ssrRenderAttr("value", unref(form).name)} class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60" placeholder="Ví dụ: Banner popup mobile" required></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Mô tả</span><input${ssrRenderAttr("value", unref(form).description)} class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60" placeholder="Ghi chú để dễ nhớ vị trí hoặc đối tác ads"></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Vị trí chèn</span><select class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"><option value="head"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "head") : ssrLooseEqual(unref(form).placement, "head")) ? " selected" : ""}>Head</option><option value="body-start"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "body-start") : ssrLooseEqual(unref(form).placement, "body-start")) ? " selected" : ""}>Đầu body</option><option value="body-end"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "body-end") : ssrLooseEqual(unref(form).placement, "body-end")) ? " selected" : ""}>Cuối body</option></select></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Nội dung script / HTML</span><textarea class="min-h-72 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-cyan-100 outline-none transition focus:border-cyan-400/60" placeholder="&lt;script src=&quot;https://example.com/ads.js&quot;&gt;&lt;/script&gt;" required>${ssrInterpolate(unref(form).code)}</textarea></label><label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).enabled) ? ssrLooseContain(unref(form).enabled, null) : unref(form).enabled) ? " checked" : ""} class="h-4 w-4 accent-cyan-400" type="checkbox"> Bật script ngay sau khi lưu </label>`);
      if (unref(message)) {
        _push(`<div class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">${ssrInterpolate(unref(message))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(isSaving)) ? " disabled" : ""} type="submit">`);
      if (unref(editingId)) {
        _push(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(Plus), { class: "h-4 w-4" }, null, _parent));
      }
      _push(` ${ssrInterpolate(unref(isSaving) ? "Đang lưu..." : unref(editingId) ? "Cập nhật script" : "Thêm script")}</button></form><div class="space-y-5">`);
      if (unref(scripts).length === 0) {
        _push(`<div class="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/60 p-10 text-center text-slate-300"> Chưa có script nào. Thêm script đầu tiên để nhúng quảng cáo toàn site. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(scripts), (script) => {
        _push(`<article class="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.35)]"><div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div class="space-y-3"><div class="flex flex-wrap items-center gap-3"><h3 class="text-xl font-bold text-white">${ssrInterpolate(script.name)}</h3><span class="${ssrRenderClass(
          script.enabled ? "rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300" : "rounded-full bg-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-300"
        )}">${ssrInterpolate(script.enabled ? "Đang bật" : "Đang tắt")}</span><span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">${ssrInterpolate(script.placement)}</span></div>`);
        if (script.description) {
          _push(`<p class="text-sm leading-6 text-slate-300">${ssrInterpolate(script.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-2 text-xs text-slate-400 sm:grid-cols-2"><p>Tạo lúc: ${ssrInterpolate(formatDate(script.createdAt))}</p><p>Cập nhật: ${ssrInterpolate(formatDate(script.updatedAt))}</p></div></div><div class="flex flex-wrap gap-3"><button class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10" type="button">`);
        _push(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent));
        _push(` Sửa </button><button class="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(busyId) === script.id) ? " disabled" : ""} type="button">`);
        _push(ssrRenderComponent(unref(Power), { class: "h-4 w-4" }, null, _parent));
        _push(` ${ssrInterpolate(script.enabled ? "Tắt" : "Bật")}</button><button class="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(busyId) === script.id) ? " disabled" : ""} type="button">`);
        _push(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
        _push(` Xóa </button></div></div><pre class="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-cyan-100"><code>${ssrInterpolate(script.code)}</code></pre></article>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminDashboard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AdminLoginForm",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const isSubmitting = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur" }, _attrs))}><div class="mb-8 space-y-4"><div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">`);
      _push(ssrRenderComponent(unref(ShieldCheck), { class: "h-4 w-4" }, null, _parent));
      _push(` Quản trị Phimhayz.site </div><div><h1 class="text-3xl font-black text-white">Đăng nhập admin</h1><p class="mt-2 text-sm leading-6 text-slate-300"> Tài khoản được xác thực ở phía server và phiên đăng nhập lưu bằng cookie HttpOnly đã mã hóa. </p></div></div><form class="space-y-5"><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Tài khoản</span><input${ssrRenderAttr("value", unref(username))} autocomplete="username" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:bg-white/8" placeholder="Nhập tài khoản admin" required></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">Mật khẩu</span><div class="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/60 focus-within:bg-white/8">`);
      _push(ssrRenderComponent(unref(LockKeyhole), { class: "h-4 w-4 text-slate-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(password))} autocomplete="current-password" class="w-full bg-transparent px-3 py-3 text-white outline-none" placeholder="Nhập mật khẩu admin" required type="password"></div></label>`);
      if (unref(error)) {
        _push(`<div class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} type="submit">${ssrInterpolate(unref(isSubmitting) ? "Đang xác thực..." : "Vào trang quản trị")}</button></form></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AdminLoginForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry of value.entries()) {
        const [key, val] = entry;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dep-trai-s1",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const headers = useRequestHeaders(["cookie"]);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/bootstrap",
      {
        headers,
        key: "admin-bootstrap",
        default: () => ({
          authenticated: false,
          scripts: []
        })
      },
      "$Xbor9IDlmf"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Admin - Phimhayz.site",
      meta: [
        {
          name: "robots",
          content: "noindex,nofollow"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AdminDashboard = _sfc_main$2;
      const _component_AdminLoginForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen items-center justify-center" }, _attrs))}>`);
      if (unref(data)?.authenticated) {
        _push(ssrRenderComponent(_component_AdminDashboard, {
          "initial-scripts": unref(data).scripts || []
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_AdminLoginForm, null, null, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dep-trai-s1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=dep-trai-s1-C-m_mZnl.js.map
