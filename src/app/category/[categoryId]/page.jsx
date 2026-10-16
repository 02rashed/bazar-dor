import Link from "next/link";
import { Suspense } from "react";

const CategoryContent = async ({ params }) => {
  const { categoryId } = await params;

  const apiUrls = [ "https://openapi.programming-hero.com/api/bazardor/products",
     "https://api.abcz.workers.dev/api/bazardor/products",];
  let allProducts = [];
  let lastError;

  for (const url of apiUrls) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) {
        lastError = new Error(`API returned ${res.status}: ${url}`);
        continue;
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        lastError = new Error("API response is not an array");
        continue;
      }

      allProducts = data;
      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (allProducts.length === 0) {
    throw new Error(
      `Unable to load products: ${lastError?.message ?? "No data"}`
    );
  }

  const products = allProducts.filter(
    (product) => product.category === categoryId
  );

  return (
    <main className="container mx-auto p-6 max-w-6xl mt-35">
      <h1 className="text-2xl font-bold mb-6">
        {products[0]?.categoryNameBn || categoryId}
      </h1>
      <p className="mb-4 text-slate-600">
        মোট পণ্য: {products.length}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div
            className="rounded-xl border bg-white p-4 shadow-sm flex items-center gap-4 h-full" >
            <span className="text-4xl">{product.image || "🛒"}</span>
            <div>
              <h2 className="text-lg font-bold">
                {product.nameBn}
              </h2>
              <p className="text-sm text-slate-500">
                ক্যাটাগরি: {product.categoryNameBn}
              </p>
              <p className="text-sm text-slate-500">
                প্রতি - {product.unit}
              </p>
              <p className="mt-1">
                আজকের দাম <span className="font-semibold">{product.today} টাকা</span>  
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p>এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
      )}
    </main>
  );
};

const Page = ({ params }) => {
  return (
    <Suspense fallback={<div className="text-center mt-40">লোড হচ্ছে...</div>}>
      <CategoryContent params={params} />
    </Suspense>
  );
};

export default Page;