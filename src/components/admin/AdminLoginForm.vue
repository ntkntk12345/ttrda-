<script setup lang="ts">
import { LockKeyhole, ShieldCheck } from "lucide-vue-next";

interface AdminApiErrorResponse {
  error?: string;
  message?: string;
  statusMessage?: string;
  data?: {
    message?: string;
    statusMessage?: string;
  };
}

const username = ref("");
const password = ref("");
const error = ref("");
const isSubmitting = ref(false);

function getErrorMessage(
  result: AdminApiErrorResponse | null,
  fallback: string,
) {
  return (
    result?.error ||
    result?.statusMessage ||
    result?.data?.statusMessage ||
    result?.message ||
    result?.data?.message ||
    fallback
  );
}

async function handleSubmit() {
  error.value = "";
  isSubmitting.value = true;

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const result = (await response.json().catch(() => null)) as
      | AdminApiErrorResponse
      | null;

    if (!response.ok) {
      error.value = getErrorMessage(result, "Đăng nhập thất bại.");
      return;
    }

    window.location.reload();
  } catch {
    error.value = "Không thể kết nối tới máy chủ.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-8 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur">
    <div class="mb-8 space-y-4">
      <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
        <ShieldCheck class="h-4 w-4" />
        Quản trị Phimhayz.site
      </div>

      <div>
        <h1 class="text-3xl font-black text-white">Đăng nhập admin</h1>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          Tài khoản được xác thực ở phía server và phiên đăng nhập lưu bằng cookie
          HttpOnly đã mã hóa.
        </p>
      </div>
    </div>

    <form class="space-y-5" @submit.prevent="handleSubmit">
      <label class="block space-y-2">
        <span class="text-sm font-medium text-slate-200">Tài khoản</span>
        <input
          v-model="username"
          autocomplete="username"
          class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60 focus:bg-white/8"
          placeholder="Nhập tài khoản admin"
          required
        />
      </label>

      <label class="block space-y-2">
        <span class="text-sm font-medium text-slate-200">Mật khẩu</span>
        <div class="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/60 focus-within:bg-white/8">
          <LockKeyhole class="h-4 w-4 text-slate-400" />
          <input
            v-model="password"
            autocomplete="current-password"
            class="w-full bg-transparent px-3 py-3 text-white outline-none"
            placeholder="Nhập mật khẩu admin"
            required
            type="password"
          />
        </div>
      </label>

      <div
        v-if="error"
        class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
      >
        {{ error }}
      </div>

      <button
        class="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="isSubmitting"
        type="submit"
      >
        {{ isSubmitting ? "Đang xác thực..." : "Vào trang quản trị" }}
      </button>
    </form>
  </div>
</template>
