export type NavItem = {
  label: string;
  href: string;
  slug?: string;
};

export const mainNav: NavItem[] = [
  { label: "Ana səhifə", href: "/" },
  { label: "Futbol", href: "/category/futbol", slug: "futbol" },
  { label: "Müsahibə", href: "/category/musahibe", slug: "musahibe" },
  { label: "Olimpizm", href: "/category/olimpizm", slug: "olimpizm" },
  { label: "Bizimlə Qazan", href: "/category/bizimle", slug: "bizimle" },
  { label: "Formula 1", href: "/category/formula-1", slug: "formula-1" },
  { label: "Foto", href: "/category/foto", slug: "foto" },
  { label: "Video", href: "/category/video", slug: "video" },
];

export const otherNav: NavItem[] = [
  { label: "AGİN", slug: "agin" },
  { label: "Qış idmanı", slug: "qis-idmani" },
  { label: "Kikboksinq", slug: "kikboksinq" },
  { label: "Voleybol", slug: "voleybol" },
  { label: "Xokkey", slug: "xokkey" },
  { label: "Basketbol", slug: "basketbol" },
  { label: "Avtomobil", slug: "avtomobil" },
  { label: "Yüngül atletika", slug: "yungul-atletika" },
  { label: "Ağır atletika", slug: "agir-atletika" },
  { label: "Güləş", slug: "gules" },
  { label: "Karate", slug: "karate" },
  { label: "Tennis", slug: "tennis" },
  { label: "Gimnastika", slug: "gimnastika" },
  { label: "Həndbol", slug: "hendbol" },
  { label: "Boks", slug: "boks" },
  { label: "Döyüş növləri", slug: "doyus-novleri" },
  { label: "Üzgüçülük", slug: "uzguculuk" },
  { label: "Velosiped", slug: "velosiped" },
  { label: "Cüdo", slug: "cudo" },
].map((item) => ({ ...item, href: `/category/${item.slug}` }));

export const otherCategory: NavItem = {
  label: "Digər",
  href: "/category/diger",
  slug: "diger",
};

/** Every category that gets its own (currently empty) page. */
export const allCategories: NavItem[] = [
  ...mainNav.filter((i) => i.slug),
  otherCategory,
  ...otherNav,
];

export function findCategory(slug: string) {
  return allCategories.find((c) => c.slug === slug);
}

export function isOtherSubcategory(slug: string) {
  return otherNav.some((c) => c.slug === slug);
}

export const socials = [
  { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { name: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
  { name: "Telegram", href: "https://t.me", icon: "telegram" },
  { name: "X", href: "https://x.com", icon: "x" },
] as const;
