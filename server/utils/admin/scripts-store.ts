import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type {
  GlobalScriptEntry,
  ScriptPlacement,
  ScriptsDataFile,
} from "~/types/admin";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "global-scripts.json");
const EMPTY_DATA: ScriptsDataFile = { scripts: [] };

let writeQueue: Promise<void> = Promise.resolve();

export interface ScriptInput {
  name: string;
  description: string;
  placement: ScriptPlacement;
  code: string;
  enabled: boolean;
}

function isPlacement(value: unknown): value is ScriptPlacement {
  return value === "head" || value === "body-start" || value === "body-end";
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string") {
    return new Date().toISOString();
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed)
    ? new Date().toISOString()
    : new Date(parsed).toISOString();
}

function normalizeEntry(input: Partial<GlobalScriptEntry>): GlobalScriptEntry | null {
  if (typeof input.id !== "string" || !input.id.trim()) {
    return null;
  }

  const code = typeof input.code === "string" ? input.code.trim() : "";

  if (!code) {
    return null;
  }

  return {
    id: input.id,
    name:
      typeof input.name === "string" && input.name.trim()
        ? input.name.trim()
        : `Script ${input.id.slice(0, 8)}`,
    description:
      typeof input.description === "string" ? input.description.trim() : "",
    placement: isPlacement(input.placement) ? input.placement : "body-end",
    code,
    enabled: Boolean(input.enabled),
    createdAt: normalizeDate(input.createdAt),
    updatedAt: normalizeDate(input.updatedAt),
  };
}

function sortScripts(scripts: GlobalScriptEntry[]) {
  return [...scripts].sort((left, right) => {
    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(EMPTY_DATA, null, 2), "utf8");
  }
}

async function readDataFile(): Promise<ScriptsDataFile> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");

  try {
    const parsed = JSON.parse(raw) as Partial<ScriptsDataFile>;
    const scripts = Array.isArray(parsed.scripts)
      ? parsed.scripts
          .map((entry) => normalizeEntry(entry))
          .filter((entry): entry is GlobalScriptEntry => Boolean(entry))
      : [];

    return { scripts: sortScripts(scripts) };
  } catch {
    return EMPTY_DATA;
  }
}

async function writeDataFile(data: ScriptsDataFile) {
  const task = async () => {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  };

  writeQueue = writeQueue.then(task, task);
  await writeQueue;
}

export function parseScriptInput(input: unknown): ScriptInput {
  const source = typeof input === "object" && input !== null ? input : {};
  const record = source as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const description =
    typeof record.description === "string" ? record.description.trim() : "";
  const placement = record.placement;
  const code = typeof record.code === "string" ? record.code.trim() : "";
  const enabled = Boolean(record.enabled);

  if (!name) {
    throw new Error("Tên script không được để trống.");
  }

  if (!isPlacement(placement)) {
    throw new Error("Vị trí nhúng không hợp lệ.");
  }

  if (!code) {
    throw new Error("Nội dung script không được để trống.");
  }

  return {
    name,
    description,
    placement,
    code,
    enabled,
  };
}

export async function getAllScripts() {
  const data = await readDataFile();
  return sortScripts(data.scripts);
}

export async function getActiveScripts() {
  const scripts = await getAllScripts();
  return scripts.filter((script) => script.enabled);
}

export async function createScript(input: ScriptInput) {
  const data = await readDataFile();
  const now = new Date().toISOString();
  const script: GlobalScriptEntry = {
    id: randomUUID(),
    name: input.name,
    description: input.description,
    placement: input.placement,
    code: input.code,
    enabled: input.enabled,
    createdAt: now,
    updatedAt: now,
  };

  const nextData = {
    scripts: sortScripts([script, ...data.scripts]),
  };

  await writeDataFile(nextData);
  return script;
}

export async function updateScript(id: string, input: ScriptInput) {
  const data = await readDataFile();
  const index = data.scripts.findIndex((script) => script.id === id);

  if (index === -1) {
    throw new Error("Không tìm thấy script cần sửa.");
  }

  const current = data.scripts[index];
  const updated: GlobalScriptEntry = {
    ...current,
    ...input,
    updatedAt: new Date().toISOString(),
  };

  const nextScripts = data.scripts.map((script) =>
    script.id === id ? updated : script,
  );

  await writeDataFile({ scripts: sortScripts(nextScripts) });
  return updated;
}

export async function deleteScript(id: string) {
  const data = await readDataFile();
  const exists = data.scripts.some((script) => script.id === id);

  if (!exists) {
    throw new Error("Không tìm thấy script cần xóa.");
  }

  const nextScripts = data.scripts.filter((script) => script.id !== id);
  await writeDataFile({ scripts: sortScripts(nextScripts) });
}
