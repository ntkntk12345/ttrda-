<script setup lang="ts">
import {
  LogOut,
  Pencil,
  Plus,
  Power,
  Shield,
  Trash2,
} from "lucide-vue-next";

import type { GlobalScriptEntry, ScriptPlacement } from "~/types/admin";

interface ScriptFormState {
  name: string;
  description: string;
  placement: ScriptPlacement;
  code: string;
  enabled: boolean;
}

const props = defineProps<{
  initialScripts: GlobalScriptEntry[];
}>();

const emptyForm = (): ScriptFormState => ({
  name: "",
  description: "",
  placement: "body-end",
  code: "",
  enabled: true,
});

function sortScripts(scripts: GlobalScriptEntry[]) {
  return [...scripts].sort((left, right) => {
    return (
      new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
    );
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const scripts = ref(sortScripts(props.initialScripts));
const form = reactive<ScriptFormState>(emptyForm());
const editingId = ref<string | null>(null);
const message = ref("");
const error = ref("");
const isSaving = ref(false);
const busyId = ref<string | null>(null);

function resetForm() {
  editingId.value = null;
  Object.assign(form, emptyForm());
}

function startEdit(script: GlobalScriptEntry) {
  editingId.value = script.id;
  message.value = "";
  error.value = "";
  Object.assign(form, {
    name: script.name,
    description: script.description,
    placement: script.placement,
    code: script.code,
    enabled: script.enabled,
  });
}

async function handleSubmit() {
  message.value = "";
  error.value = "";
  isSaving.value = true;

  try {
    const response = await fetch(
      editingId.value
        ? `/api/admin/scripts/${editingId.value}`
        : "/api/admin/scripts",
      {
        method: editingId.value ? "PUT" : "POST",
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
      error.value = result?.error || "Không thể lưu script.";
      return;
    }

    const savedScript = result.script;

    scripts.value = sortScripts(
      editingId.value
        ? scripts.value.map((item) =>
            item.id === savedScript.id ? savedScript : item,
          )
        : [savedScript, ...scripts.value],
    );

    message.value = editingId.value
      ? "Đã cập nhật script."
      : "Đã thêm script mới.";
    resetForm();
  } catch {
    error.value = "Không thể kết nối tới máy chủ.";
  } finally {
    isSaving.value = false;
  }
}

async function toggleScript(script: GlobalScriptEntry) {
  busyId.value = script.id;
  message.value = "";
  error.value = "";

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
      error.value = result?.error || "Không thể đổi trạng thái script.";
      return;
    }

    scripts.value = sortScripts(
      scripts.value.map((item) =>
        item.id === result.script!.id ? result.script! : item,
      ),
    );
    message.value = result.script.enabled ? "Đã bật script." : "Đã tắt script.";
  } catch {
    error.value = "Không thể kết nối tới máy chủ.";
  } finally {
    busyId.value = null;
  }
}

async function removeScript(script: GlobalScriptEntry) {
  if (!window.confirm(`Xóa script "${script.name}"?`)) {
    return;
  }

  busyId.value = script.id;
  message.value = "";
  error.value = "";

  try {
    const response = await fetch(`/api/admin/scripts/${script.id}`, {
      method: "DELETE",
    });

    const result = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    if (!response.ok) {
      error.value = result?.error || "Không thể xóa script.";
      return;
    }

    scripts.value = scripts.value.filter((item) => item.id !== script.id);
    if (editingId.value === script.id) {
      resetForm();
    }
    message.value = "Đã xóa script.";
  } catch {
    error.value = "Không thể kết nối tới máy chủ.";
  } finally {
    busyId.value = null;
  }
}

async function logout() {
  message.value = "";
  error.value = "";

  try {
    await fetch("/api/admin/logout", {
      method: "POST",
    });
  } finally {
    window.location.reload();
  }
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
    <div class="rounded-[2rem] border border-cyan-400/20 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(2,12,27,0.55)] backdrop-blur">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-4">
          <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <Shield class="h-4 w-4" />
            Bảng điều khiển quảng cáo toàn site
          </div>

          <div>
            <h1 class="text-3xl font-black text-white sm:text-4xl">Phimhayz.site Admin</h1>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Quản lý script hiển thị trên mọi trang public. Có thể thêm, sửa, xóa,
              bật hoặc tắt từng đoạn mã quảng cáo mà không cần sửa code tay.
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            {{ scripts.length }} script
          </div>
          <button
            class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            type="button"
            @click="logout"
          >
            <LogOut class="h-4 w-4" />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>

    <div class="grid gap-8 xl:grid-cols-[420px_minmax(0,1fr)]">
      <form
        class="space-y-5 rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.45)]"
        @submit.prevent="handleSubmit"
      >
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">
              {{ editingId ? "Sửa script" : "Thêm script mới" }}
            </h2>
            <p class="mt-1 text-sm text-slate-400">
              Script sẽ được áp lên mọi trang public, không chèn vào khu admin.
            </p>
          </div>
          <button
            v-if="editingId"
            class="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5"
            type="button"
            @click="resetForm"
          >
            Hủy sửa
          </button>
        </div>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-200">Tên script</span>
          <input
            v-model="form.name"
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="Ví dụ: Banner popup mobile"
            required
          />
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-200">Mô tả</span>
          <input
            v-model="form.description"
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
            placeholder="Ghi chú để dễ nhớ vị trí hoặc đối tác ads"
          />
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-200">Vị trí chèn</span>
          <select
            v-model="form.placement"
            class="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400/60"
          >
            <option value="head">Head</option>
            <option value="body-start">Đầu body</option>
            <option value="body-end">Cuối body</option>
          </select>
        </label>

        <label class="block space-y-2">
          <span class="text-sm font-medium text-slate-200">Nội dung script / HTML</span>
          <textarea
            v-model="form.code"
            class="min-h-72 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 font-mono text-sm text-cyan-100 outline-none transition focus:border-cyan-400/60"
            placeholder='<script src="https://example.com/ads.js"></script>'
            required
          />
        </label>

        <label class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <input
            v-model="form.enabled"
            class="h-4 w-4 accent-cyan-400"
            type="checkbox"
          />
          Bật script ngay sau khi lưu
        </label>

        <div
          v-if="message"
          class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
        >
          {{ message }}
        </div>

        <div
          v-if="error"
          class="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          {{ error }}
        </div>

        <button
          class="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="isSaving"
          type="submit"
        >
          <Pencil v-if="editingId" class="h-4 w-4" />
          <Plus v-else class="h-4 w-4" />
          {{ isSaving ? "Đang lưu..." : editingId ? "Cập nhật script" : "Thêm script" }}
        </button>
      </form>

      <div class="space-y-5">
        <div
          v-if="scripts.length === 0"
          class="rounded-[2rem] border border-dashed border-white/15 bg-slate-950/60 p-10 text-center text-slate-300"
        >
          Chưa có script nào. Thêm script đầu tiên để nhúng quảng cáo toàn site.
        </div>

        <article
          v-for="script in scripts"
          :key="script.id"
          class="rounded-[2rem] border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_60px_rgba(2,12,27,0.35)]"
        >
          <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-3">
                <h3 class="text-xl font-bold text-white">{{ script.name }}</h3>
                <span
                  :class="
                    script.enabled
                      ? 'rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300'
                      : 'rounded-full bg-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-300'
                  "
                >
                  {{ script.enabled ? "Đang bật" : "Đang tắt" }}
                </span>
                <span class="rounded-full bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                  {{ script.placement }}
                </span>
              </div>

              <p v-if="script.description" class="text-sm leading-6 text-slate-300">
                {{ script.description }}
              </p>

              <div class="grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
                <p>Tạo lúc: {{ formatDate(script.createdAt) }}</p>
                <p>Cập nhật: {{ formatDate(script.updatedAt) }}</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                type="button"
                @click="startEdit(script)"
              >
                <Pencil class="h-4 w-4" />
                Sửa
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-70"
                :disabled="busyId === script.id"
                type="button"
                @click="toggleScript(script)"
              >
                <Power class="h-4 w-4" />
                {{ script.enabled ? "Tắt" : "Bật" }}
              </button>
              <button
                class="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                :disabled="busyId === script.id"
                type="button"
                @click="removeScript(script)"
              >
                <Trash2 class="h-4 w-4" />
                Xóa
              </button>
            </div>
          </div>

          <pre class="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs leading-6 text-cyan-100"><code>{{ script.code }}</code></pre>
        </article>
      </div>
    </div>
  </div>
</template>
