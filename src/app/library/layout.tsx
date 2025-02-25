import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description: "Library for easy kindle application",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
