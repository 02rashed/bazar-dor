
import Image from "next/image";
import Navbar from "./Navbar"; 
import Link from "next/link"; 
const Header = () => {
       const date =new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="fixed top-0 z-50 w-full bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-white py-3 px-6 shadow-sm">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-xl bg-[#008a45] p-2.5 shadow-sm">
              <Link href="/">
              <Image
                src="/logo-icon.png"
                width={25}
                height={25}
                alt="logo"
                className="object-contain text-white"
              />
              </Link>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                বাজার দর
              </h1>
               <p className="text-xs font-medium text-gray-500">{date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold text-gray-800 transition-colors hover:text-green-700">
              সাইন ইন
            </button>
            <button className="rounded-lg bg-[#008a45] px-5 py-2 text-sm font-bold text-white shadow-md shadow-green-700/20 transition-all hover:bg-green-700 active:scale-95">
              সাইন আপ
            </button>
          </div>
        </div>
      </div>
      <Navbar />    
    </div>
  );
};

export default Header;
