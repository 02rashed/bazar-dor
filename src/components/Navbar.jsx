import Link from "next/link";

const Navbar =async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data = await res.json();
    return (
        <div className="container mx-auto w-full flex items-center gap-4 border-b border-gray-100 bg-white z-50 lg:px-[12%] md:px-0 sm:px-0 py-2 overflow-x-auto">
            {data.map((nav, i) => <Link key={i} href={`/category/${nav.slug}`} className="px-2 text-black">{nav.icon}{nav.nameBn}</Link>)}
        </div>
    );
};

export default Navbar;