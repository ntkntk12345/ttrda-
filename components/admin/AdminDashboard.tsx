"use client";

import { LogOut, Pencil, Plus, Power, Shield, Trash2 } from "lucide-react";
import { useState } from "react";

import type { GlobalScriptEntry, ScriptPlacement } from "@/lib/admin/types";

interface AdminDashboardProps {
  initialScripts: GlobalScriptEntry[];
}

interface ScriptFormState {
  name: string;
  description: string;
  placement: ScriptPlacement;
  code: string;
  enabled: boolean;
}

const EMPTY_FORM: ScriptFormState = {
  name: "",
  description: "",
  placement: "body-end",
  code: "",
  enabled: true,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function sortScripts(scripts: GlobalScriptEntry[]) {
  return [...scripts].sort((left, right) => {
    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

export default function AdminDashboard({
  initialScripts,
}: AdminDashboardProps) {
  const [scripts, setScripts] = useState(() => sortScripts(initialScripts));
  const [form, setForm] = useState<ScriptFormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  function updateForm<K extends keyof ScriptFormState>(
    key: K,
    value: ScriptFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function startEdit(script: GlobalScriptEntry) {
    setEditingId(script.id);
    setMessage("");
    setError("");
    setForm({
      name: script.name,
      description: script.description,
      placement: script.placement,
      code: script.code,
      enabled: script.enabled,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(
        editingId ? `/api/admin/scripts/${editingId}` : "/api/admin/scripts",
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const result = (await response.json().catch(() => null)) as
        | { error?: string; script?: GlobalScriptEntry }
        | null;

      if (!response.ok || !result?.script) {
        setError(result?.error ?? "Không thể lưu script.");
        return;
      }

      const savedScript = result.script;

      setScripts((current) => {
        const next = editingId
          ? current.map((item) => (item.id === savedScript.id ? savedScript : item))
          : [savedScript, ...current];

        return sortScripts(next);
      });
      setMessage(editingId ? "Đã cập nhật script." : "Đã thêm script mới.");
      resetForm();
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setIsSaving(false);
    }
  }

  async function toggleScript(script: GlobalScriptEntry) {
    setBusyId(script.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/scripts/${script.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: script.name,
          description: script.description,
          placement: script.placement,
          code: script.code,
          enabled: !script.enabled,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; script?: GlobalScriptEntry }
        | null;

      if (!response.ok || !result?.script) {
        setError(result?.error ?? "Không thể đổi trạng thái script.");
        return;
      }

      const savedScript = result.script;

      setScripts((current) =>
        sortScripts(
          current.map((item) => (item.id === savedScript.id ? savedScript : item)),
        ),
      );
      setMessage(
        savedScript.enabled ? "Đã bật script." : "Đã tắt script.",
      );
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setBusyId(null);
    }
  }

  async function removeScript(script: GlobalScriptEntry) {
    if (!window.confirm(`Xóa script "${script.name}"?`)) {
      return;
    }

    setBusyId(script.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/scripts/${script.id}`, {
        method: "DELETE",
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setError(result?.error ?? "Không thể xóa script.");
        return;
      }

      setScripts((current) => current.filter((item) => item.id !== script.id));
      if (editingId === script.id) {
        resetForm();
      }
      setMessage("Đã xóa script.");
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    setMessage("");
    setError("");

    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              <Shield className="h-4 w-4" />
              Bảng điều khiển quảng cáo toàn site
            </div>

            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                Phimhayz.site Admin
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Quản lý script hiển thị trên mọi trang public. Có thể thêm,
                sửa, xóa, bật hoặc tắt từng đoạn mã quảng cáo mà không cần sửa
                code tay.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              {scripts.length} script
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              onClick={logout}
              type="button"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
        <form
          className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.45)]"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {editingId ? "Sửa script" : "Thêm script mới"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Script sẽ được áp lên mọi trang public, không chèn vào khu admin.
              </p>
            </div>
            {editingId ? (
              <button
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
                onClick={resetForm}
                type="button"
              >
                Hủy sửa
              </button>
            ) : null}
          </div>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Tên script</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
              onChange={(event) => updateForm("name", event.target.value)}
              placeholder="Ví dụ: Banner popup mobile"
              required
              value={form.name}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Mô tả</span>
            <input
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
              onChange={(event) => updateForm("description", event.target.value)}
              placeholder="Ghi chú để dễ nhớ vị trí hoặc đối tác ads"
              value={form.description}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">Vị trí chèn</span>
            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
              onChange={(event) =>
                updateForm("placement", event.target.value as ScriptPlacement)
              }
              value={form.placement}
            >
              <option value="head">Head</option>
              <option value="body-start">Đầu body</option>
              <option value="body-end">Cuối body</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-200">
              Nội dung script / HTML
            </span>
            <textarea
              className="min-h-72 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-cyan-100 outline-none transition focus:border-cyan-400/60"
              onChange={(event) => updateForm("code", event.target.value)}
              placeholder={`<script src="https://example.com/ads.js"></script>`}
              required
              value={form.code}
            />
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <input
              checked={form.enabled}
              className="h-4 w-4 accent-cyan-400"
              onChange={(event) => updateForm("enabled", event.target.checked)}
              type="checkbox"
            />
            Bật script ngay sau khi lưu
          </label>

          {message ? (
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : null}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSaving}
            type="submit"
          >
            {editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {isSaving
              ? "Đang lưu..."
              : editingId
                ? "Cập nhật script"
                : "Thêm script"}
          </button>
        </form>

        <div className="space-y-5">
          {scripts.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/60 p-10 text-center text-slate-300">
              Chưa có script nào. Thêm script đầu tiên để nhúng quảng cáo toàn site.
            </div>
          ) : (
            scripts.map((script) => (
              <article
                className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.35)]"
                key={script.id}
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{script.name}</h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          script.enabled
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-slate-700/60 text-slate-300"
                        }`}
                      >
                        {script.enabled ? "Đang bật" : "Đang tắt"}
                      </span>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                        {script.placement}
                      </span>
                    </div>

                    {script.description ? (
                      <p className="text-sm leading-6 text-slate-300">
                        {script.description}
                      </p>
                    ) : null}

                    <div className="grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
                      <p>Tạo lúc: {formatDate(script.createdAt)}</p>
                      <p>Cập nhật: {formatDate(script.updatedAt)}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                      onClick={() => startEdit(script)}
                      type="button"
                    >
                      <Pencil className="h-4 w-4" />
                      Sửa
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={busyId === script.id}
                      onClick={() => toggleScript(script)}
                      type="button"
                    >
                      <Power className="h-4 w-4" />
                      {script.enabled ? "Tắt" : "Bật"}
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                      disabled={busyId === script.id}
                      onClick={() => removeScript(script)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Xóa
                    </button>
                  </div>
                </div>

                <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-cyan-100">
                  <code>{script.code}</code>
                </pre>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
