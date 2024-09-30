import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";
import React from "react";
import profileImg from "@/assets/images/pro.jpeg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

type WrapperType = {
  children: React.ReactNode;
};

const ThemeWrapper = ({ children }: WrapperType) => {
  const { isDarkTheme } = useTheme();
  return (
    <div
      className={`flex flex-col font-barlow text-[0.9375rem] w-full space-y-24 transition-all duration-500 delay-75  ${
        isDarkTheme ? "bg-slate-900 text-white" : " bg-white text-slate-900"
      }`}
    >
      <main className={`px-4 xl:px-[8%] 2xl:px-[21.5%] w-full space-y-8`}>
        <Navbar src={profileImg} />
        {children}
      </main>

      <Footer />
    </div>
  );
};
