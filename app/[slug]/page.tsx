import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Page from "@/components/Page";
import { P, TITLE, W } from "@/lib/pages";

export function generateStaticParams() {
  return Object.keys(P)
    .filter((slug) => slug !== "home")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (!P[slug]) return {};
  return { title: TITLE[slug], description: W[slug]?.[0] };
}

export default async function Slug({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  if (!P[slug]) notFound();
  return <Page id={slug} />;
}
