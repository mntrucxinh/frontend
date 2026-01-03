import Footer from "@/app/(app)/_components/Footer";
import Header from "@/app/(app)/_components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức",
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}