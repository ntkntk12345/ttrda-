import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-card-dark border-t border-white/5 pt-16 pb-8 text-sm text-gray-400">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="mb-8">
                        <span className="text-2xl font-black tracking-wide text-white drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]">
                            CINE<span className="text-primary">WAVE</span>
                        </span>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
                            Trải nghiệm xem phim đỉnh cao với kho phim khổng lồ, chất lượng HD và cập nhật liên tục.
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Khám Phá</h4>
                        <ul className="space-y-3">
                            <li><Link href="/danh-sach/phim-le" className="hover:text-primary transition-colors">Phim Lẻ</Link></li>
                            <li><Link href="/danh-sach/phim-bo" className="hover:text-primary transition-colors">Phim Bộ</Link></li>
                            <li><Link href="/danh-sach/hoat-hinh" className="hover:text-primary transition-colors">Phim Hoạt Hình</Link></li>
                            <li><Link href="/danh-sach/tv-shows" className="hover:text-primary transition-colors">TV Shows</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Hỗ Trợ</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="hover:text-primary transition-colors">Liên Hệ</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Điều Khoản Sử Dụng</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Chính Sách Bảo Mật</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Nhận Thông Tin Mới</h4>
                        <p className="mb-4">Đăng ký để nhận thông báo về phim mới cập nhật.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="bg-background-dark border border-white/10 rounded-l-lg px-4 py-2 focus:outline-none focus:border-primary/50 w-full"
                            />
                            <button className="bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg font-medium transition-colors">
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CINEWAVE. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Facebook</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
