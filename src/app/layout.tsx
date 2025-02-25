import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  icons: {
    icon: "./icon_app.svg",
  },
  title: "EasyKindle",
  description:
    "Send books to your Kindle in seconds with EasyKindle. No more cables or syncing!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </div>
        }
      </body>
    </html>
  );
}
