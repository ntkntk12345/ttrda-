"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { cn } from "@/utils/cn";

const CATEGORIES = [
  { value: "", label: "Tất cả thể loại" },
  { value: "hanh-dong", label: "Hành Động" },
  { value: "tinh-cam", label: "Tình Cảm" },
  { value: "hai-huoc", label: "Hài Hước" },
  { value: "co-trang", label: "Cổ Trang" },
  { value: "tam-ly", label: "Tâm Lý" },
  { value: "hinh-su", label: "Hình Sự" },
  { value: "chien-tranh", label: "Chiến Tranh" },
  { value: "the-thao", label: "Thể Thao" },
  { value: "vo-thuat", label: "Võ Thuật" },
  { value: "vien-tuong", label: "Viễn Tưởng" },
  { value: "phieu-luu", label: "Phiêu Lưu" },
  { value: "khoa-hoc", label: "Khoa Học" },
  { value: "kinh-di", label: "Kinh Dị" },
  { value: "am-nhac", label: "Âm Nhạc" },
  { value: "than-thoai", label: "Thần Thoại" },
  { value: "tai-lieu", label: "Tài Liệu" },
  { value: "gia-dinh", label: "Gia Đình" },
];

const COUNTRIES = [
  { value: "", label: "Tất cả quốc gia" },
  { value: "trung-quoc", label: "Trung Quốc" },
  { value: "han-quoc", label: "Hàn Quốc" },
  { value: "nhat-ban", label: "Nhật Bản" },
  { value: "my", label: "Mỹ" },
  { value: "thai-lan", label: "Thái Lan" },
  { value: "viet-nam", label: "Việt Nam" },
  { value: "an-do", label: "Ấn Độ" },
  { value: "hong-kong", label: "Hồng Kông" },
  { value: "dai-loan", label: "Đài Loan" },
  { value: "au-my", label: "Âu Mỹ" },
];

const YEARS = [
  { value: "", label: "Tất cả năm" },
  ...Array.from({ length: 15 }, (_, i) => ({
    value: (new Date().getFullYear() - i).toString(),
    label: (new Date().getFullYear() - i).toString(),
  })),
];

const TYPES = [
  { value: "", label: "Tất cả tình trạng" },
  { value: "phim-le", label: "Phim Lẻ" },
  { value: "phim-bo", label: "Phim Bộ" },
  { value: "hoat-hinh", label: "Hoạt Hình" },
  { value: "tv-shows", label: "TV Shows" },
];

const SORTS = [
  { value: "modified.time", label: "Mới nhất" },
  { value: "year", label: "Năm phát hành" },
  { value: "view", label: "Xem nhiều" },
];

export default function MovieFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    country: searchParams.get("country") || "",
    year: searchParams.get("year") || "",
    type: searchParams.get("type") || "",
    sort: searchParams.get("sort") || "modified.time",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.country) params.set("country", filters.country);
    if (filters.year) params.set("year", filters.year);
    if (filters.type) params.set("type", filters.type);
    if (filters.sort) params.set("sort", filters.sort);

    router.push(`/tim-kiem?${params.toString()}`);
  };

  return (
    <div className="mb-8 rounded-xl border border-white/5 bg-[#0f172a]/50 p-4 backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-medium uppercase text-gray-500">
            Thể loại
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#040714] px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
              onChange={(event) =>
                handleFilterChange("category", event.target.value)
              }
              value={filters.category}
            >
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-medium uppercase text-gray-500">
            Quốc gia
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#040714] px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
              onChange={(event) =>
                handleFilterChange("country", event.target.value)
              }
              value={filters.country}
            >
              {COUNTRIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-medium uppercase text-gray-500">
            Năm
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#040714] px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
              onChange={(event) => handleFilterChange("year", event.target.value)}
              value={filters.year}
            >
              {YEARS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-medium uppercase text-gray-500">
            Tình trạng
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#040714] px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
              onChange={(event) => handleFilterChange("type", event.target.value)}
              value={filters.type}
            >
              {TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="ml-1 text-xs font-medium uppercase text-gray-500">
            Sắp xếp
          </label>
          <div className="relative">
            <select
              className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#040714] px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
              onChange={(event) => handleFilterChange("sort", event.target.value)}
              value={filters.sort}
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                fill="none"
                height="6"
                viewBox="0 0 10 6"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-end">
          <button
            className="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-400/20 transition-colors hover:bg-cyan-300"
            onClick={handleApplyFilter}
          >
            <Filter className="h-4 w-4" />
            Lọc Phim
          </button>
        </div>
      </div>
    </div>
  );
}
