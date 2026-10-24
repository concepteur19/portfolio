import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/contexts/themeContext";
import React from "react";
import profileImg from "@/assets/images/pro.jpeg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="flex flex-col font-barlow text-[0.9375rem] w-full space-y-24 transition-colors duration-500 bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
        <main className="px-4 md:px-6 lg:px-8 xl:px-[8%] 2xl:px-[21.5%] w-full space-y-8">
          <Navbar src={profileImg} />
          <Component {...pageProps} />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
