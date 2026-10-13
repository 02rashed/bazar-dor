import Image from "next/image";
import Banner from "@/components/Banner";
import HikePrice from "@/components/HikePrice";
import PriceReduce from "@/components/PriceReduce";
import AllProducts from "@/components/AllProducts";
import Marquee from "@/components/Marquee";
export default function Home() {
  return (
    <div> 
        <Marquee/>
        <Banner />
        <HikePrice />
        <PriceReduce />
        <AllProducts />
    </div>
  );
}
