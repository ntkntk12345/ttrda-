import type { GlobalScriptEntry } from "~/types/admin";

const ADMIN_ROUTE_PREFIX = "/dep-trai-s1";
const SSR_MARKER_SELECTOR = 'meta[name="phimhayz-global-scripts-ssr"]';
const SSR_BLOCK_START_SELECTOR = "script[data-phimhayz-global-script-start]";
const SSR_BLOCK_END_ATTRIBUTE = "data-phimhayz-global-script-end";

const insertedNodes: Node[] = [];
let skippedInitialSsrPass = false;

function cleanupInsertedNodes() {
  while (insertedNodes.length > 0) {
    const node = insertedNodes.pop();
    node?.parentNode?.removeChild(node);
  }
}

function cleanupSsrInjectedNodes() {
  const startMarkers = Array.from(
    document.querySelectorAll<HTMLScriptElement>(SSR_BLOCK_START_SELECTOR),
  );

  for (const startMarker of startMarkers) {
    const blockId = startMarker.dataset.phimhayzGlobalScriptStart;

    if (!blockId || !startMarker.parentNode) {
      continue;
    }

    const parent = startMarker.parentNode;
    let cursor: ChildNode | null = startMarker;

    while (cursor) {
      const nextSibling: ChildNode | null = cursor.nextSibling;
      parent.removeChild(cursor);

      if (
        cursor instanceof HTMLScriptElement &&
        cursor.getAttribute(SSR_BLOCK_END_ATTRIBUTE) === blockId
      ) {
        break;
      }

      cursor = nextSibling;
    }
  }

  const ssrMarkers = Array.from(document.querySelectorAll(SSR_MARKER_SELECTOR));

  for (const marker of ssrMarkers) {
    marker.parentNode?.removeChild(marker);
  }
}

function cloneNodeForExecution(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    return text.trim() ? document.createTextNode(text) : null;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (tagName === "script") {
    const nextScript = document.createElement("script");

    for (const attribute of Array.from(element.attributes)) {
      nextScript.setAttribute(attribute.name, attribute.value);
    }

    nextScript.textContent = element.textContent;
    return nextScript;
  }

  const nextElement = document.createElement(tagName);

  for (const attribute of Array.from(element.attributes)) {
    nextElement.setAttribute(attribute.name, attribute.value);
  }

  for (const child of Array.from(element.childNodes)) {
    const nextChild = cloneNodeForExecution(child);

    if (nextChild) {
      nextElement.appendChild(nextChild);
    }
  }

  return nextElement;
}

function createNodesFromHtml(html: string) {
  const template = document.createElement("template");
  template.innerHTML = html;

  return Array.from(template.content.childNodes)
    .map((node) => cloneNodeForExecution(node))
    .filter((node): node is Node => node !== null);
}

function appendNodes(
  target: ParentNode,
  nodes: Node[],
  anchor: ChildNode | null = null,
) {
  for (const node of nodes) {
    if (anchor) {
      target.insertBefore(node, anchor);
    } else {
      target.appendChild(node);
    }

    insertedNodes.push(node);
  }
}

function injectScripts(scripts: GlobalScriptEntry[]) {
  cleanupInsertedNodes();

  const activeScripts = scripts.filter((script) => script.enabled);

  for (const script of activeScripts) {
    const nodes = createNodesFromHtml(script.code);

    if (nodes.length === 0) {
      continue;
    }

    if (script.placement === "head") {
      appendNodes(document.head, nodes);
      continue;
    }

    if (script.placement === "body-start") {
      appendNodes(document.body, nodes, document.body.firstChild);
      continue;
    }

    appendNodes(document.body, nodes);
  }
}

async function loadScripts() {
  const response = await fetch("/api/global-scripts", {
    cache: "no-store",
  });

  const result = (await response.json().catch(() => null)) as
    | { scripts?: GlobalScriptEntry[] }
    | null;

  return Array.isArray(result?.scripts) ? result.scripts : [];
}

export default defineNuxtPlugin((nuxtApp) => {
  async function refreshScriptsForRoute() {
    const route = useRoute();

    if (route.path.startsWith(ADMIN_ROUTE_PREFIX)) {
      cleanupInsertedNodes();
      cleanupSsrInjectedNodes();
      return;
    }

    if (!skippedInitialSsrPass && document.querySelector(SSR_MARKER_SELECTOR)) {
      skippedInitialSsrPass = true;
      return;
    }

    cleanupSsrInjectedNodes();

    try {
      const scripts = await loadScripts();
      injectScripts(scripts);
    } catch {
      cleanupInsertedNodes();
    }
  }

  nuxtApp.hook("app:mounted", () => {
    void refreshScriptsForRoute();
  });

  nuxtApp.hook("page:finish", () => {
    void refreshScriptsForRoute();
  });

  nuxtApp.hook("app:error", () => {
    cleanupInsertedNodes();
  });
});
