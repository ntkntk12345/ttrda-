import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card-dark pb-8 pt-16 text-sm text-gray-400">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="mb-8">
            <Link className="inline-flex items-center" href="/">
              <Image
                alt="Phimhayz.site"
                className="h-24 w-24 rounded-full border border-white/10 object-cover shadow-[0_0_36px_rgba(34,211,238,0.2)]"
                height={96}
                src="/images/phimhay.jpg"
                width={96}
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Kho phim online cập nhật nhanh, giao diện gọn gàng và trải nghiệm
              xem phim mượt trên cả điện thoại lẫn máy tính.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Khám phá</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/danh-sach/phim-le"
                >
                  Phim lẻ
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/danh-sach/phim-bo"
                >
                  Phim bộ
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/danh-sach/hoat-hinh"
                >
                  Hoạt hình
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/danh-sach/tv-shows"
                >
                  TV Shows
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li>
                <Link className="transition-colors hover:text-primary" href="#">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="#">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-primary" href="#">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Nhận phim mới</h4>
            <p className="mb-4">
              Đăng ký để theo dõi các phim mới cập nhật mỗi tuần.
            </p>
            <form className="flex">
              <input
                className="w-full rounded-l-lg border border-white/10 bg-background-dark px-4 py-2 focus:border-primary/50 focus:outline-none"
                placeholder="Email của bạn"
                type="email"
              />
              <button className="rounded-r-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-blue-500">
                Gửi
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Phimhayz.site. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link className="transition-colors hover:text-white" href="#">
              Facebook
            </Link>
            <Link className="transition-colors hover:text-white" href="#">
              Twitter
            </Link>
            <Link className="transition-colors hover:text-white" href="#">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
