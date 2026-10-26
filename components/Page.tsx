import PageContent from "@/components/PageContent";
import { renderPage } from "@/lib/pages";

export default function Page({ id }: { id: string }) {
  return <PageContent html={renderPage(id)} />;
}
