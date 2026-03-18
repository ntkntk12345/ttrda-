<script setup lang="ts">
import type { GlobalScriptEntry } from "~/types/admin";

const SSR_MARKER_SELECTOR = 'meta[name="phimhayz-global-scripts-ssr"]';
const insertedNodes: Node[] = [];

function cleanupInsertedNodes() {
  while (insertedNodes.length > 0) {
    const node = insertedNodes.pop();
    node?.parentNode?.removeChild(node);
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

function appendNodes(target: ParentNode, nodes: Node[], anchor: ChildNode | null = null) {
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

onMounted(async () => {
  if (document.querySelector(SSR_MARKER_SELECTOR)) {
    return;
  }

  try {
    const scripts = await loadScripts();
    injectScripts(scripts);
  } catch {
    cleanupInsertedNodes();
  }
});

onBeforeUnmount(() => {
  cleanupInsertedNodes();
});
</script>

<template />
