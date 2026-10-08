import Link from "next/link";

const Navbar =async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
    const data = await res.json();
    return (
        <div className="flex items-center gap-4 border-b border-gray-100 bg-white py-3 font-[600] lg:px-[12%] shadow-sm sm:px-6 md:px-8 ">
            {data.map((nav, i) => <Link key={i} href={nav.slug} className="px-2">{nav.icon}{nav.nameBn}</Link>)}
        </div>
    );
};

export default Navbar;