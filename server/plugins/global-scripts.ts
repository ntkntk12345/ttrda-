import { getActiveScripts } from "../utils/admin/scripts-store";

function wrapScriptBlock(scriptId: string, markup: string) {
  return [
    `<script type="application/json" data-phimhayz-global-script-start="${scriptId}"></script>`,
    markup,
    `<script type="application/json" data-phimhayz-global-script-end="${scriptId}"></script>`,
  ];
}

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
        .flatMap((script) => wrapScriptBlock(script.id, script.code)),
    );

    html.bodyPrepend.push(
      ...scripts
        .filter((script) => script.placement === "body-start")
        .flatMap((script) => wrapScriptBlock(script.id, script.code)),
    );

    html.bodyAppend.push(
      ...scripts
        .filter((script) => script.placement === "body-end")
        .flatMap((script) => wrapScriptBlock(script.id, script.code)),
    );
  });
});
