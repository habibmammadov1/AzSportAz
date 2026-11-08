import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCategories, findCategory } from "@/lib/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: findCategory(slug)?.label ?? "Kateqoriya" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = findCategory(slug);
  if (!cat) notFound();

  return <h1 className="sr-only">{cat.label}</h1>;
}
