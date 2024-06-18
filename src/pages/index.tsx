import Image from "next/image";
import { Inter, Poppins, Barlow } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });
const barlow = Barlow({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between font-barlow text-sm`}
    >
      <Navbar />
      <Footer />
    </main>
  );
}
