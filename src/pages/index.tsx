import Image from "next/image";
import { Inter, Poppins, Barlow } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import profileImg from "@/assets/images/pro.jpeg";
// import About from "@/components/sections/About";
import Home from "@/components/sections/Home";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function index() {
  return (
    <div className={`flex flex-col font-barlow text-sm w-full space-y-24`}>
      <main className={`px-4 xl:px-[8%] 2xl:px-[21.5%] w-full space-y-8`}>
        <Navbar src={profileImg} />
        <Home  profileImg = {profileImg.src}/>
      </main>
      <Footer />
    </div>
  );
}
