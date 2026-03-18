<script setup lang="ts">
import type { GlobalScriptEntry } from "~/types/admin";

definePageMeta({
  layout: "admin",
});

interface AdminBootstrapResponse {
  authenticated: boolean;
  scripts: GlobalScriptEntry[];
}

const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
const { data } = await useFetch<AdminBootstrapResponse>("/api/admin/bootstrap", {
  headers,
  key: "admin-bootstrap",
  default: () => ({
    authenticated: false,
    scripts: [],
  }),
});

useHead({
  title: "Admin - Phimhayz.site",
  meta: [
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ],
});
</script>

<template>
  <div class="relative flex min-h-screen items-center justify-center">
    <AdminDashboard
      v-if="data?.authenticated"
      :initial-scripts="data.scripts || []"
    />
    <AdminLoginForm v-else />
  </div>
</template>
