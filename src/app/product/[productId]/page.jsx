import React, { Suspense } from "react";
import Image from "next/image";

const ProductDetailsContent = async ({ params }) => {
  const { productId } = await params;
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productId}`, {
    cache: "force-cache",
  });
  const product = await res.json();
  const markets = product.markets || [];
  
  const lowestMarket = markets.length > 0 
    ? markets.reduce((lowest, market) => Number(market.min) < Number(lowest.min) ? market : lowest)
    : null;

  const highestMarket = markets.length > 0 
    ? markets.reduce((highest, market) => Number(market.max) > Number(highest.max) ? market : highest)
    : null;

  const averagePrice = markets.length > 0 
    ? markets.reduce((total, market) => total + (Number(market.min) + Number(market.max)) / 2, 0) / markets.length 
    : 0;

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  const changeDirection = product.change?.dir;
  const changePercent = product.change?.pct;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-4 text-[#172b23] sm:px-6 mt-40">
      <div className="mx-auto max-w-[1120px] space-y-6">
        <section className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-5 sm:flex-row sm:px-5 sm:py-5">
          <div className="flex w-full min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
                {product.image ? (
                <img src={product.image} alt={product.nameBn }
                  className="h-14 w-14 object-contain" />
                ) : ( product.categoryIcon)
                  }
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-bold leading-tight tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-base text-[#829087]">
                প্রতি {product.unit || "কেজি"} ·{" "} {product.categoryNameBn}
              </p>
              <p className="mt-2 text-sm text-[#829087]">
                গতকালের তুলনায় আজ দাম{" "}
                {changeDirection === "up" ? (
                <span className="font-medium text-red-500">
                    বেড়েছে {formatPrice(changePercent)}%
                  </span>) : changeDirection === "down" ? (
                  <span className="font-medium text-green-600">
                    কমেছে {formatPrice(changePercent)}%
                  </span>) : ( <span>পরিবর্তন নেই</span>)
                }
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-[#f0f5f0] px-6 py-4 text-center sm:w-auto sm:min-w-[124px]">
            <p className="text-sm text-[#829087]">
              আজকের দাম
            </p>
            <p className="text-3xl font-extrabold leading-tight">
              {formatPrice(product.today)}
            </p>
            <p className="text-sm text-[#829087]">
              টাকা / {product.unit || "কেজি"}
            </p>
            <p
              className={`mt-1 text-sm font-semibold ${ changeDirection === "up"
                  ? "text-red-500" : changeDirection === "down" ? "text-green-600" : "text-[#829087]"
              }`}>
              {changeDirection === "up"
                ? "▲ " : changeDirection === "down" ? "▼ " : ""}
              {changePercent != null ? `${formatPrice(changePercent)}%` : "--"}
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-5 sm:p-5">
          <h2 className="mb-3 text-xl font-bold">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#e4ebe4] px-6 py-4">
              <p className="text-sm text-[#829087]">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-1 text-2xl font-bold leading-tight text-[#159b55]">
                {lowestMarket ? `${formatPrice(lowestMarket.min)} টাকা` : "তথ্য নেই"}
              </p>
              <p className="mt-1 text-sm text-[#829087]">
                সবচেয়ে কম দামের বাজার
              </p>
              {lowestMarket && (
                <p className="text-sm font-medium text-[#52645a]">
                  {lowestMarket.market}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-[#e4ebe4] px-6 py-4">
              <p className="text-sm text-[#829087]">
                সর্বাধিক দাম
              </p>
              <p className="mt-1 text-2xl font-bold leading-tight text-[#e34b3e]">
                {highestMarket ? `${formatPrice(highestMarket.max)} টাকা` : "তথ্য নেই"}
              </p>
              <p className="mt-1 text-sm text-[#829087]">
                সবচেয়ে বেশি দামের বাজার
              </p>
              {highestMarket && (
                <p className="text-sm font-medium text-[#52645a]">
                  {highestMarket.market}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-[#e4ebe4] px-6 py-4">
              <p className="text-sm text-[#829087]">
                গড় দাম
              </p>
              <p className="mt-1 text-2xl font-bold leading-tight text-[#159b55]">
                {averagePrice !== null ? `${formatPrice(averagePrice)} টাকা`: "তথ্য নেই"}
              </p>
              <p className="mt-1 text-sm text-[#829087]">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>
          </div>
          <h2 className="mb-3 mt-6 text-xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e4ebe4]">
            <table className="w-full min-w-[650px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e4ebe4] text-[#829087]">
                  <th className="px-4 py-3 font-medium">
                    বাজার
                  </th>
                  <th className="px-4 py-3 font-medium">
                    বিভাগ
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    সর্বাধিক
                  </th>
                  <th className="px-4 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody>
                {markets.length > 0 ? (
                  markets.map((market, index) => {
                    const marketAverage = (Number(market.min) + Number(market.max)) / 2;
                    return (
                      <tr key={`${market.market}-${index}`}
                        className={`transition-colors hover:bg-[#edf4ed] 
                            ${index % 2 === 1 ? "bg-[#f0f5f0]" : "bg-[#fbfdfb]"}`
                            }>
                        <td className="whitespace-nowrap px-4 py-3 font-medium">
                          {market.market}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-[#829087]">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          {formatPrice(market.min)} টাকা
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right">
                          {formatPrice(market.max)} টাকা
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-right font-semibold">
                          {formatPrice(marketAverage)} টাকা
                        </td>
                      </tr>
                    );
                  })) : (<tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-[#829087]">
                      কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const Page = ({ params }) => {
  return (
    <Suspense fallback={<div className="text-center mt-40">লোড হচ্ছে...</div>}>
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default Page;