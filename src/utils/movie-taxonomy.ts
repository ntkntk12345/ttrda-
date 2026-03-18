export const CATEGORY_TITLES: Record<string, string> = {
  "phim-bo": "Phim bộ",
  "phim-le": "Phim lẻ",
  "hoat-hinh": "Phim hoạt hình",
  "tv-shows": "TV Shows",
  "phim-moi-cap-nhat": "Phim mới cập nhật",
  "phim-vietsub": "Phim Vietsub",
  "phim-thuyet-minh": "Phim thuyết minh",
  "phim-long-tieng": "Phim lồng tiếng",
  "phim-bo-dang-chieu": "Phim bộ đang chiếu",
  "phim-bo-hoan-thanh": "Phim bộ hoàn thành",
  "phim-sap-chieu": "Phim sắp chiếu",
  subteam: "Subteam",
  action: "Hành động",
  adventure: "Phiêu lưu",
  horror: "Kinh dị",
  comedy: "Hài hước",
  romance: "Tình cảm",
  drama: "Tâm lý",
  fantasy: "Viễn tưởng",
  "science-fiction": "Khoa học",
  mystery: "Bí ẩn",
  thriller: "Giật gân",
  crime: "Hình sự",
  war: "Chiến tranh",
  history: "Lịch sử",
  music: "Âm nhạc",
  family: "Gia đình",
  documentary: "Tài liệu",
  sport: "Thể thao",
  animation: "Hoạt hình",
  musical: "Nhạc kịch",
  biography: "Tiểu sử",
  western: "Miền Tây",
};

export const FILTER_CATEGORIES = [
  { value: "", label: "Tất cả thể loại" },
  { value: "hanh-dong", label: "Hành động" },
  { value: "tinh-cam", label: "Tình cảm" },
  { value: "hai-huoc", label: "Hài hước" },
  { value: "co-trang", label: "Cổ trang" },
  { value: "tam-ly", label: "Tâm lý" },
  { value: "hinh-su", label: "Hình sự" },
  { value: "chien-tranh", label: "Chiến tranh" },
  { value: "the-thao", label: "Thể thao" },
  { value: "vo-thuat", label: "Võ thuật" },
  { value: "vien-tuong", label: "Viễn tưởng" },
  { value: "phieu-luu", label: "Phiêu lưu" },
  { value: "khoa-hoc", label: "Khoa học" },
  { value: "kinh-di", label: "Kinh dị" },
  { value: "am-nhac", label: "Âm nhạc" },
  { value: "than-thoai", label: "Thần thoại" },
  { value: "tai-lieu", label: "Tài liệu" },
  { value: "gia-dinh", label: "Gia đình" },
];

export const FILTER_COUNTRIES = [
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

export const FILTER_TYPES = [
  { value: "", label: "Tất cả tình trạng" },
  { value: "phim-le", label: "Phim lẻ" },
  { value: "phim-bo", label: "Phim bộ" },
  { value: "hoat-hinh", label: "Hoạt hình" },
  { value: "tv-shows", label: "TV Shows" },
];

export const FILTER_SORTS = [
  { value: "modified.time", label: "Mới nhất" },
  { value: "year", label: "Năm phát hành" },
  { value: "view", label: "Xem nhiều" },
];

export const FILTER_YEARS = [
  { value: "", label: "Tất cả năm" },
  ...Array.from({ length: 15 }, (_, index) => {
    const year = String(new Date().getFullYear() - index);
    return {
      value: year,
      label: year,
    };
  }),
];
