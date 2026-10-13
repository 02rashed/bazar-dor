
const HikePrice = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const data = await res.json();


  const topHikedProducts = data.filter((product) => product.change?.dir === "up").sort((a, b) => 
    (b.change?.pct || 0) - (a.change?.pct || 0)).slice(0, 6);

  return (
    <section className="container mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-red-600 text-xl">▲</span> আজ দাম বেড়েছে
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topHikedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-5 shadow-sm 
          border border-slate-100/80 flex flex-col justify-between" >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-slate-100/70 flex items-center
               justify-center text-2xl flex-shrink-0">
                {product.image || product.categoryIcon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">
                  {product.nameBn}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  প্রতি {product.unit}
                </p>
              </div>
            </div>
            <div className="flex items-end justify-between border-t border-slate-50 pt-3 mt-auto">
              <div>
                <p className="text-xs text-slate-400 mb-0.5">আজকের দাম</p>
                <p className="text-xl font-bold text-slate-900">
                  {product.today}{' '}
                  <span className="text-base font-normal text-slate-700">টাকা</span>
                </p>
              </div>
              <div className="flex items-center gap-1 bg-red-50 text-red-600 
              font-semibold text-sm px-2.5 py-1 rounded-md">
                <span className="text-xs">▲</span>
                <span>{product.change?.pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HikePrice;