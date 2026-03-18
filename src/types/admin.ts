export type ScriptPlacement = "head" | "body-start" | "body-end";

export interface GlobalScriptEntry {
  id: string;
  name: string;
  description: string;
  placement: ScriptPlacement;
  code: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ScriptsDataFile {
  scripts: GlobalScriptEntry[];
}
