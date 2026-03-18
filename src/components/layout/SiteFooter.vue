<template>
  <footer class="border-t border-white/5 bg-card-dark pb-8 pt-16 text-sm text-gray-400">
    <div class="container mx-auto px-4">
      <div class="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
        <div class="mb-8">
          <NuxtLink class="inline-flex items-center" to="/">
            <img
              alt="Phimhayz.site"
              class="h-24 w-24 rounded-full border border-white/10 object-cover shadow-[0_0_36px_rgba(34,211,238,0.2)]"
              height="96"
              src="/images/phimhay.jpg"
              width="96"
            />
          </NuxtLink>

          <p class="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            Kho phim online cập nhật nhanh, giao diện gọn gàng và trải nghiệm xem phim
            mượt trên cả điện thoại lẫn máy tính.
          </p>
        </div>

        <div>
          <h4 class="mb-6 font-semibold text-white">Khám phá</h4>
          <ul class="space-y-3">
            <li><NuxtLink class="transition-colors hover:text-primary" to="/danh-sach/phim-le">Phim lẻ</NuxtLink></li>
            <li><NuxtLink class="transition-colors hover:text-primary" to="/danh-sach/phim-bo">Phim bộ</NuxtLink></li>
            <li><NuxtLink class="transition-colors hover:text-primary" to="/danh-sach/hoat-hinh">Hoạt hình</NuxtLink></li>
            <li><NuxtLink class="transition-colors hover:text-primary" to="/danh-sach/tv-shows">TV Shows</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 font-semibold text-white">Hỗ trợ</h4>
          <ul class="space-y-3">
            <li><a class="transition-colors hover:text-primary" href="#">Liên hệ</a></li>
            <li><a class="transition-colors hover:text-primary" href="#">FAQ</a></li>
            <li><a class="transition-colors hover:text-primary" href="#">Điều khoản sử dụng</a></li>
            <li><a class="transition-colors hover:text-primary" href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div>
          <h4 class="mb-6 font-semibold text-white">Nhận phim mới</h4>
          <p class="mb-4">Đăng ký để theo dõi các phim mới cập nhật mỗi tuần.</p>
          <form class="flex" @submit.prevent>
            <input
              class="w-full rounded-l-lg border border-white/10 bg-background-dark px-4 py-2 focus:border-primary/50 focus:outline-none"
              placeholder="Email của bạn"
              type="email"
            />
            <button
              class="rounded-r-lg bg-primary px-4 py-2 font-medium text-slate-950 transition-colors hover:bg-cyan-300"
              type="submit"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row">
        <p>&copy; {{ new Date().getFullYear() }} Phimhayz.site. All rights reserved.</p>
        <div class="mt-4 flex gap-6 md:mt-0">
          <a class="transition-colors hover:text-white" href="#">Facebook</a>
          <a class="transition-colors hover:text-white" href="#">Twitter</a>
          <a class="transition-colors hover:text-white" href="#">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>
