"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => { 
            window.location.href = "/";
        },
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div>
          <button onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-full bg-transparent p-1 hover:bg-gray-100 transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#008a45] text-white font-bold uppercase">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <span className="font-medium text-gray-800 text-sm">{user.name}</span>
            <span className="text-xs text-gray-500">▼</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl z-50">
              <div className="mb-3 border-b border-gray-100 pb-3">
                <p className="font-semibold text-gray-900 text-base">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>

              <div className="space-y-1">
                <Link href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-purple-600 font-bold">👤</span>
                  <span>আমার প্রোফাইল</span>
                </Link>

                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span>↪</span>
                  <span>সাইন আউট</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm font-bold text-gray-800 transition-colors hover:text-green-700">
            সাইন ইন
          </Link>
          <Link href="/signup" className="rounded-lg bg-[#008a45] px-5 py-2 text-sm font-bold text-white shadow-md shadow-green-700/20 transition-all hover:bg-green-700 active:scale-95">
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;