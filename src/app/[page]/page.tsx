import type { Metadata } from "next";
import { notFound } from "next/navigation";

const infoPages: Record<string, string> = {
  haqqimizda: "Haqqımızda",
  redaksiya: "Redaksiya",
  reklam: "Reklam",
  elaqe: "Əlaqə",
  mexfilik: "Məxfilik siyasəti",
};

type Props = { params: Promise<{ page: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(infoPages).map((page) => ({ page }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  return { title: infoPages[page] };
}

export default async function InfoPage({ params }: Props) {
  const { page } = await params;
  const title = infoPages[page];
  if (!title) notFound();

  return <h1 className="sr-only">{title}</h1>;
}
