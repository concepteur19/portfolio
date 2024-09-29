import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";
import React from "react";

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
      className={` transition-all duration-500 delay-75 ${
        isDarkTheme ? "bg-slate-900 text-white" : " bg-white text-slate-900"
      }`}
    >
      {" "}
      {children}{" "}
    </div>
  );
};
