import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/hookable/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/unctx/dist/index.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/defu/dist/defu.mjs";
import "C:/Users/trong/Downloads/ttrda-/ttrda-/node_modules/ufo/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[radial-gradient(circle_at_top,#0f766e_0%,#020617_45%,#020617_100%)] text-white" }, _attrs))}><div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.1),transparent_35%,rgba(14,165,233,0.08))]"></div><div class="relative min-h-screen">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const admin = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  admin as default
};
//# sourceMappingURL=admin-k8UW2He3.js.map
