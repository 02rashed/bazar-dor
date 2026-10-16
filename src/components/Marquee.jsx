

const Marquee = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
    cache: "force-cache",
  });
  const data = await res.json();
  const products = Array.isArray(data) ? data.slice(10, 30) : [];

  return (
    <div className="fixed bg-[#f5f5f5] text-[#333] text-[14px] font-[500] mt-28 px-2 py-2 overflow-hidden">
      <marquee direction="left" scrollamount="5">
        <div className="inline-flex items-center">
          {products.map((product, index) => (
            <span className="inline-flex items-center gap-1.5 text-[16px] px-4 whitespace-nowrap" 
              key={product.id || `${product.nameBn}-${index}`} >
              <span>{product.image || product.categoryIcon}</span>
              <span>{product.nameBn}</span>
              <span className="text-slate-500">({product.today}/{product.unit})</span>
              <span className="inline-flex items-center">
                {product.change?.dir === "up" ? (<span className="text-red-600 font-bold"> ▲ {product.change.pct}%</span>
                ) : (
                  <span className="text-green-600 font-bold"> ▼ {product.change.pct}%</span>
                )}
              </span>
            </span>
          ))}
        </div>
      </marquee>
    </div>
  );
};

export default Marquee;