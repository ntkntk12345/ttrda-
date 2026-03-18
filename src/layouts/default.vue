<template>
  <div class="flex min-h-screen flex-col bg-background-dark font-display text-white">
    <GlobalScriptsClient />
    <SiteHeader />
    <main class="flex-grow pt-20">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
