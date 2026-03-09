"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter } from 'lucide-react';
import { cn } from '@/utils/cn';

const CATEGORIES = [
    { value: '', label: 'Tất cả thể loại' },
    { value: 'hanh-dong', label: 'Hành Động' },
    { value: 'tinh-cam', label: 'Tình Cảm' },
    { value: 'hai-huoc', label: 'Hài Hước' },
    { value: 'co-trang', label: 'Cổ Trang' },
    { value: 'tam-ly', label: 'Tâm Lý' },
    { value: 'hinh-su', label: 'Hình Sự' },
    { value: 'chien-tranh', label: 'Chiến Tranh' },
    { value: 'the-thao', label: 'Thể Thao' },
    { value: 'vo-thuat', label: 'Võ Thuật' },
    { value: 'vien-tuong', label: 'Viễn Tưởng' },
    { value: 'phieu-luu', label: 'Phiêu Lưu' },
    { value: 'khoa-hoc', label: 'Khoa Học' },
    { value: 'kinh-di', label: 'Kinh Dị' },
    { value: 'am-nhac', label: 'Âm Nhạc' },
    { value: 'than-thoai', label: 'Thần Thoại' },
    { value: 'tai-lieu', label: 'Tài Liệu' },
    { value: 'gia-dinh', label: 'Gia Đình' },
];

const COUNTRIES = [
    { value: '', label: 'Tất cả quốc gia' },
    { value: 'trung-quoc', label: 'Trung Quốc' },
    { value: 'han-quoc', label: 'Hàn Quốc' },
    { value: 'nhat-ban', label: 'Nhật Bản' },
    { value: 'my', label: 'Mỹ' },
    { value: 'thai-lan', label: 'Thái Lan' },
    { value: 'viet-nam', label: 'Việt Nam' },
    { value: 'an-do', label: 'Ấn Độ' },
    { value: 'hong-kong', label: 'Hồng Kông' },
    { value: 'dai-loan', label: 'Đài Loan' },
    { value: 'au-my', label: 'Âu Mỹ' },
];

const YEARS = [
    { value: '', label: 'Tất cả năm' },
    ...Array.from({ length: 15 }, (_, i) => ({
        value: (new Date().getFullYear() - i).toString(),
        label: (new Date().getFullYear() - i).toString()
    }))
];

const TYPES = [
    { value: '', label: 'Tất cả tình trạng' },
    { value: 'phim-le', label: 'Phim Lẻ' },
    { value: 'phim-bo', label: 'Phim Bộ' },
    { value: 'hoat-hinh', label: 'Hoạt Hình' },
    { value: 'tv-shows', label: 'TV Shows' },
];

const SORTS = [
    { value: 'modified.time', label: 'Mới nhất' },
    { value: 'year', label: 'Năm phát hành' },
    { value: 'view', label: 'Xem nhiều' },
];

export default function MovieFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        country: searchParams.get('country') || '',
        year: searchParams.get('year') || '',
        type: searchParams.get('type') || '',
        sort: searchParams.get('sort') || 'modified.time',
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApplyFilter = () => {
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        if (filters.country) params.set('country', filters.country);
        if (filters.year) params.set('year', filters.year);
        if (filters.type) params.set('type', filters.type);
        if (filters.sort) params.set('sort', filters.sort);

        // Remove keyword if exists to switch to filter mode
        router.push(`/tim-kiem?${params.toString()}`);
    };

    return (
        <div className="bg-[#0f172a]/50 p-4 rounded-xl border border-white/5 backdrop-blur-sm mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                {/* Category */}
                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase ml-1">Thể loại</label>
                    <div className="relative">
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full bg-[#040714] text-white text-sm border border-white/10 rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                            {CATEGORIES.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Country */}
                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase ml-1">Quốc gia</label>
                    <div className="relative">
                        <select
                            value={filters.country}
                            onChange={(e) => handleFilterChange('country', e.target.value)}
                            className="w-full bg-[#040714] text-white text-sm border border-white/10 rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                            {COUNTRIES.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Year */}
                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase ml-1">Năm</label>
                    <div className="relative">
                        <select
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="w-full bg-[#040714] text-white text-sm border border-white/10 rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                            {YEARS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Type/Status */}
                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase ml-1">Tình trạng</label>
                    <div className="relative">
                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="w-full bg-[#040714] text-white text-sm border border-white/10 rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                            {TYPES.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Sort */}
                <div className="space-y-1.5">
                    <label className="text-xs text-gray-500 font-medium uppercase ml-1">Sắp xếp</label>
                    <div className="relative">
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="w-full bg-[#040714] text-white text-sm border border-white/10 rounded-lg px-3 py-2.5 appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                        >
                            {SORTS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </div>

                {/* Filter Button */}
                <div className="flex items-end">
                    <button
                        onClick={handleApplyFilter}
                        className="w-full h-[42px] bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-cyan-400/20"
                    >
                        <Filter className="w-4 h-4" />
                        Lọc Phim
                    </button>
                </div>
            </div>
        </div>
    );
}
