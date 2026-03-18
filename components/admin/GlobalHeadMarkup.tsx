import { Fragment, createElement, type ReactNode } from "react";
import {
  NodeType,
  parse,
  type ParsedHTMLElement,
  type ParsedNode,
} from "next/dist/compiled/node-html-parser";

import type { GlobalScriptEntry } from "@/lib/admin/types";

interface GlobalHeadMarkupProps {
  scripts: GlobalScriptEntry[];
}

const ATTRIBUTE_NAME_MAP: Record<string, string> = {
  "accept-charset": "acceptCharset",
  charset: "charSet",
  class: "className",
  crossorigin: "crossOrigin",
  for: "htmlFor",
  "http-equiv": "httpEquiv",
  nomodule: "noModule",
  referrerpolicy: "referrerPolicy",
  srcset: "srcSet",
  tabindex: "tabIndex",
};

const BOOLEAN_ATTRIBUTES = new Set([
  "async",
  "autoFocus",
  "autoPlay",
  "controls",
  "defer",
  "disabled",
  "hidden",
  "loop",
  "muted",
  "noModule",
  "open",
  "playsInline",
  "readOnly",
  "required",
  "selected",
]);

const RAW_TEXT_ELEMENTS = new Set(["noscript", "script", "style", "title"]);
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function toReactAttributeName(name: string) {
  return ATTRIBUTE_NAME_MAP[name] ?? name;
}

function toReactAttributeValue(name: string, value: string) {
  if (BOOLEAN_ATTRIBUTES.has(name) && value === "") {
    return true;
  }

  return value;
}

function isRenderableNode(node: ReactNode): node is Exclude<ReactNode, null> {
  return node !== null;
}

function renderParsedNode(node: ParsedNode, key: string): ReactNode {
  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = node.rawText ?? "";
    return text.trim() ? text : null;
  }

  if (node.nodeType !== NodeType.ELEMENT_NODE) {
    return null;
  }

  const element = node as ParsedHTMLElement;
  const tagName = element.rawTagName.toLowerCase();
  const props: Record<string, unknown> = { key };

  for (const [name, value] of Object.entries(element.attributes)) {
    const reactName = toReactAttributeName(name);
    props[reactName] = toReactAttributeValue(reactName, value);
  }

  if (RAW_TEXT_ELEMENTS.has(tagName)) {
    props.dangerouslySetInnerHTML = { __html: element.innerHTML };
    return createElement(tagName, props);
  }

  if (VOID_ELEMENTS.has(tagName)) {
    return createElement(tagName, props);
  }

  const children = element.childNodes
    .map((child, index) => renderParsedNode(child, `${key}:${index}`))
    .filter(isRenderableNode);

  return createElement(tagName, props, ...children);
}

function renderScriptMarkup(script: GlobalScriptEntry) {
  try {
    const root = parse(script.code);

    return root.childNodes
      .map((node, index) => renderParsedNode(node, `${script.id}:${index}`))
      .filter(isRenderableNode);
  } catch {
    return null;
  }
}

export default function GlobalHeadMarkup({
  scripts,
}: GlobalHeadMarkupProps) {
  const headScripts = scripts.filter(
    (script) => script.enabled && script.placement === "head",
  );

  if (headScripts.length === 0) {
    return null;
  }

  return (
    <>
      {headScripts.map((script) => (
        <Fragment key={script.id}>{renderScriptMarkup(script)}</Fragment>
      ))}
    </>
  );
}
