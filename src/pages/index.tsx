import { Inter, Poppins, Barlow } from "next/font/google";
import profileImg from "@/assets/images/pro.jpeg";
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
    <div className={``}>
      <Home profileImg={profileImg.src} />
    </div>
  );
}
