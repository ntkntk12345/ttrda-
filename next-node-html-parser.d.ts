declare module "next/dist/compiled/node-html-parser" {
  export const NodeType: {
    readonly ELEMENT_NODE: number;
    readonly TEXT_NODE: number;
    readonly COMMENT_NODE: number;
  };

  export interface ParsedNode {
    nodeType: number;
    rawText?: string;
    childNodes: ParsedNode[];
  }

  export interface ParsedHTMLElement extends ParsedNode {
    rawTagName: string;
    attributes: Record<string, string>;
    innerHTML: string;
  }

  export interface ParsedRoot extends ParsedNode {
    childNodes: ParsedNode[];
  }

  export function parse(html: string): ParsedRoot;
}
