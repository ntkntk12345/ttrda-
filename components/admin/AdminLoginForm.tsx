"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setError(result?.error ?? "Đăng nhập thất bại.");
        return;
      }

      window.location.reload();
    } catch {
      setError("Không thể kết nối tới máy chủ.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur">
      <div className="mb-8 space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
          <ShieldCheck className="h-4 w-4" />
          Quản trị Phimhayz.site
        </div>

        <div>
          <h1 className="text-3xl font-black text-white">Đăng nhập admin</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Tài khoản được xác thực ở phía server và phiên đăng nhập lưu bằng
            cookie HttpOnly đã mã hóa.
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Tài khoản</span>
          <input
            autoComplete="username"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:bg-white/8"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Nhập tài khoản admin"
            required
            value={username}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-200">Mật khẩu</span>
          <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/60 focus-within:bg-white/8">
            <LockKeyhole className="h-4 w-4 text-slate-400" />
            <input
              autoComplete="current-password"
              className="w-full bg-transparent px-3 py-3 text-white outline-none"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Nhập mật khẩu admin"
              required
              type="password"
              value={password}
            />
          </div>
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <button
          className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Đang xác thực..." : "Vào trang quản trị"}
        </button>
      </form>
    </div>
  );
}
