"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import type { GlobalScriptEntry } from "@/lib/admin/types";

interface GlobalScriptsInjectorProps {
  initialScripts: GlobalScriptEntry[];
}

const ADMIN_ROUTE_PREFIX = "/dep-trai-s1";

function cloneNodeForExecution(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    return text.trim() ? document.createTextNode(text) : null;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;

  if (element.tagName.toLowerCase() === "script") {
    const nextScript = document.createElement("script");

    for (const attribute of Array.from(element.attributes)) {
      nextScript.setAttribute(attribute.name, attribute.value);
    }

    nextScript.textContent = element.textContent;
    return nextScript;
  }

  const nextElement = document.createElement(element.tagName.toLowerCase());

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

export default function GlobalScriptsInjector({
  initialScripts,
}: GlobalScriptsInjectorProps) {
  const pathname = usePathname();
  const [scripts, setScripts] = useState(initialScripts);
  const insertedNodesRef = useRef<Node[]>([]);
  const isAdminRoute = pathname?.startsWith(ADMIN_ROUTE_PREFIX) ?? false;

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    let cancelled = false;

    async function loadScripts() {
      try {
        const response = await fetch("/api/global-scripts", {
          cache: "no-store",
        });
        const result = (await response.json().catch(() => null)) as
          | { scripts?: GlobalScriptEntry[] }
          | null;

        if (!cancelled && Array.isArray(result?.scripts)) {
          setScripts(result.scripts);
        }
      } catch {
        if (!cancelled) {
          setScripts(initialScripts);
        }
      }
    }

    void loadScripts();

    return () => {
      cancelled = true;
    };
  }, [initialScripts, isAdminRoute]);

  useEffect(() => {
    for (const node of insertedNodesRef.current) {
      node.parentNode?.removeChild(node);
    }
    insertedNodesRef.current = [];

    if (isAdminRoute) {
      return;
    }

    const orderedScripts = scripts.filter(
      (script) => script.enabled && script.placement !== "head",
    );
    const bodyTarget = document.body;

    for (const script of orderedScripts) {
      const nodes = createNodesFromHtml(script.code);
      const anchor = script.placement === "body-start" ? bodyTarget.firstChild : null;

      for (const node of nodes) {
        if (anchor) {
          bodyTarget.insertBefore(node, anchor);
        } else {
          bodyTarget.appendChild(node);
        }
        insertedNodesRef.current.push(node);
      }
    }

    return () => {
      for (const node of insertedNodesRef.current) {
        node.parentNode?.removeChild(node);
      }
      insertedNodesRef.current = [];
    };
  }, [isAdminRoute, scripts]);

  return null;
}
