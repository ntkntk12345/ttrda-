import { getActiveScripts } from "../utils/admin/scripts-store";

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", async (html, { event }) => {
    if (event.path.startsWith("/dep-trai-s1")) {
      return;
    }

    const scripts = await getActiveScripts();

    if (scripts.length > 0) {
      html.head.push('<meta name="phimhayz-global-scripts-ssr" content="true">');
    }

    html.head.push(
      ...scripts
        .filter((script) => script.placement === "head")
        .map((script) => script.code),
    );

    html.bodyPrepend.push(
      ...scripts
        .filter((script) => script.placement === "body-start")
        .map((script) => script.code),
    );

    html.bodyAppend.push(
      ...scripts
        .filter((script) => script.placement === "body-end")
        .map((script) => script.code),
    );
  });
});
