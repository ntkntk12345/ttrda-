globalThis.__timing__.logStart('Load chunks/build/dep-trai-s1-C-m_mZnl');import { defineComponent, withAsyncContext, mergeProps, unref, computed, toValue, reactive, watch, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Shield, LogOut, Pencil, Plus, Power, Trash2, ShieldCheck, LockKeyhole } from 'lucide-vue-next';
import { N as getRequestHeaders, O as hash } from '../_/nitro.mjs';
import { f as fetchDefaults, b as useNuxtApp } from './server.mjs';
import { isPlainObject } from '@vue/shared';
import { u as useAsyncData } from './asyncData-CmHscAf-.mjs';
import { a as useHead } from './v3-m4Jfmifc.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

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
      _push(` B\u1EA3ng \u0111i\u1EC1u khi\u1EC3n qu\u1EA3ng c\xE1o to\xE0n site </div><div><h1 class="text-3xl font-black text-white sm:text-4xl">Phimhayz.site Admin</h1><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300"> Qu\u1EA3n l\xFD script hi\u1EC3n th\u1ECB tr\xEAn m\u1ECDi trang public. C\xF3 th\u1EC3 th\xEAm, s\u1EEDa, x\xF3a, b\u1EADt ho\u1EB7c t\u1EAFt t\u1EEBng \u0111o\u1EA1n m\xE3 qu\u1EA3ng c\xE1o m\xE0 kh\xF4ng c\u1EA7n s\u1EEDa code tay. </p></div></div><div class="flex flex-wrap items-center gap-3"><div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">${ssrInterpolate(unref(scripts).length)} script </div><button class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10" type="button">`);
      _push(ssrRenderComponent(unref(LogOut), { class: "h-4 w-4" }, null, _parent));
      _push(` \u0110\u0103ng xu\u1EA5t </button></div></div></div><div class="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]"><form class="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.45)]"><div class="flex items-center justify-between"><div><h2 class="text-xl font-bold text-white">${ssrInterpolate(unref(editingId) ? "S\u1EEDa script" : "Th\xEAm script m\u1EDBi")}</h2><p class="mt-1 text-sm text-slate-400"> Script s\u1EBD \u0111\u01B0\u1EE3c \xE1p l\xEAn m\u1ECDi trang public, kh\xF4ng ch\xE8n v\xE0o khu admin. </p></div>`);
      if (unref(editingId)) {
        _push(`<button class="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5" type="button"> H\u1EE7y s\u1EEDa </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">T\xEAn script</span><input${ssrRenderAttr("value", unref(form).name)} class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60" placeholder="V\xED d\u1EE5: Banner popup mobile" required></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">M\xF4 t\u1EA3</span><input${ssrRenderAttr("value", unref(form).description)} class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60" placeholder="Ghi ch\xFA \u0111\u1EC3 d\u1EC5 nh\u1EDB v\u1ECB tr\xED ho\u1EB7c \u0111\u1ED1i t\xE1c ads"></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">V\u1ECB tr\xED ch\xE8n</span><select class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"><option value="head"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "head") : ssrLooseEqual(unref(form).placement, "head")) ? " selected" : ""}>Head</option><option value="body-start"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "body-start") : ssrLooseEqual(unref(form).placement, "body-start")) ? " selected" : ""}>\u0110\u1EA7u body</option><option value="body-end"${ssrIncludeBooleanAttr(Array.isArray(unref(form).placement) ? ssrLooseContain(unref(form).placement, "body-end") : ssrLooseEqual(unref(form).placement, "body-end")) ? " selected" : ""}>Cu\u1ED1i body</option></select></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">N\u1ED9i dung script / HTML</span><textarea class="min-h-72 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-cyan-100 outline-none transition focus:border-cyan-400/60" placeholder="&lt;script src=&quot;https://example.com/ads.js&quot;&gt;&lt;/script&gt;" required>${ssrInterpolate(unref(form).code)}</textarea></label><label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).enabled) ? ssrLooseContain(unref(form).enabled, null) : unref(form).enabled) ? " checked" : ""} class="h-4 w-4 accent-cyan-400" type="checkbox"> B\u1EADt script ngay sau khi l\u01B0u </label>`);
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
      _push(` ${ssrInterpolate(unref(isSaving) ? "\u0110ang l\u01B0u..." : unref(editingId) ? "C\u1EADp nh\u1EADt script" : "Th\xEAm script")}</button></form><div class="space-y-5">`);
      if (unref(scripts).length === 0) {
        _push(`<div class="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/60 p-10 text-center text-slate-300"> Ch\u01B0a c\xF3 script n\xE0o. Th\xEAm script \u0111\u1EA7u ti\xEAn \u0111\u1EC3 nh\xFAng qu\u1EA3ng c\xE1o to\xE0n site. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(scripts), (script) => {
        _push(`<article class="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.35)]"><div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div class="space-y-3"><div class="flex flex-wrap items-center gap-3"><h3 class="text-xl font-bold text-white">${ssrInterpolate(script.name)}</h3><span class="${ssrRenderClass(
          script.enabled ? "rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300" : "rounded-full bg-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-300"
        )}">${ssrInterpolate(script.enabled ? "\u0110ang b\u1EADt" : "\u0110ang t\u1EAFt")}</span><span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">${ssrInterpolate(script.placement)}</span></div>`);
        if (script.description) {
          _push(`<p class="text-sm leading-6 text-slate-300">${ssrInterpolate(script.description)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="grid gap-2 text-xs text-slate-400 sm:grid-cols-2"><p>T\u1EA1o l\xFAc: ${ssrInterpolate(formatDate(script.createdAt))}</p><p>C\u1EADp nh\u1EADt: ${ssrInterpolate(formatDate(script.updatedAt))}</p></div></div><div class="flex flex-wrap gap-3"><button class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10" type="button">`);
        _push(ssrRenderComponent(unref(Pencil), { class: "h-4 w-4" }, null, _parent));
        _push(` S\u1EEDa </button><button class="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(busyId) === script.id) ? " disabled" : ""} type="button">`);
        _push(ssrRenderComponent(unref(Power), { class: "h-4 w-4" }, null, _parent));
        _push(` ${ssrInterpolate(script.enabled ? "T\u1EAFt" : "B\u1EADt")}</button><button class="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(busyId) === script.id) ? " disabled" : ""} type="button">`);
        _push(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent));
        _push(` X\xF3a </button></div></div><pre class="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-cyan-100"><code>${ssrInterpolate(script.code)}</code></pre></article>`);
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
      _push(` Qu\u1EA3n tr\u1ECB Phimhayz.site </div><div><h1 class="text-3xl font-black text-white">\u0110\u0103ng nh\u1EADp admin</h1><p class="mt-2 text-sm leading-6 text-slate-300"> T\xE0i kho\u1EA3n \u0111\u01B0\u1EE3c x\xE1c th\u1EF1c \u1EDF ph\xEDa server v\xE0 phi\xEAn \u0111\u0103ng nh\u1EADp l\u01B0u b\u1EB1ng cookie HttpOnly \u0111\xE3 m\xE3 h\xF3a. </p></div></div><form class="space-y-5"><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">T\xE0i kho\u1EA3n</span><input${ssrRenderAttr("value", unref(username))} autocomplete="username" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:bg-white/8" placeholder="Nh\u1EADp t\xE0i kho\u1EA3n admin" required></label><label class="block space-y-2"><span class="text-sm font-medium text-slate-200">M\u1EADt kh\u1EA9u</span><div class="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/60 focus-within:bg-white/8">`);
      _push(ssrRenderComponent(unref(LockKeyhole), { class: "h-4 w-4 text-slate-400" }, null, _parent));
      _push(`<input${ssrRenderAttr("value", unref(password))} autocomplete="current-password" class="w-full bg-transparent px-3 py-3 text-white outline-none" placeholder="Nh\u1EADp m\u1EADt kh\u1EA9u admin" required type="password"></div></label>`);
      if (unref(error)) {
        _push(`<div class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} type="submit">${ssrInterpolate(unref(isSubmitting) ? "\u0110ang x\xE1c th\u1EF1c..." : "V\xE0o trang qu\u1EA3n tr\u1ECB")}</button></form></div>`);
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
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
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
  var _a;
  return ((_a = useRequestEvent()) == null ? void 0 : _a.$fetch) || globalThis.$fetch;
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
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
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
      var _a;
      const _component_AdminDashboard = _sfc_main$2;
      const _component_AdminLoginForm = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative flex min-h-screen items-center justify-center" }, _attrs))}>`);
      if ((_a = unref(data)) == null ? void 0 : _a.authenticated) {
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

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/dep-trai-s1-C-m_mZnl');
//# sourceMappingURL=dep-trai-s1-C-m_mZnl.mjs.map
