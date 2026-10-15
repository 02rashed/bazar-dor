import Image from "next/image";

const Banner = () => {
    const date = new Date().toLocaleDateString( "bn-BD" ,
        {
        dateStyle : "full"
    });
    return (
        <div className="container mx-auto w-6xl flex items-center justify-between gap-4 bg-[#f5f5f5] mt-50 rounded-10 p-6">
            <div className="w-[50%] flex flex-col gap-4">
                <p>{date}</p>
                <p className="text-3xl">আজকের বাজারের দাম এক নজরে </p>
                <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button src="/AllProducts" className="rounded-lg w-[200px] bg-[#008a45] px-5 py-3 text-sm font-bold text-white shadow-md shadow-green-700/20
                 transition-all hover:bg-green-700 active:scale-95">সব পণ্য দেখুন</button>
            </div>
            <div>
                <Image src="/bazar-hero.png" width={400} height={400} alt="logo" className="object-contain text-white" />  
            </div>
        </div>
    );
};

export default Banner;