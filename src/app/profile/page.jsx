"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const { data: session, refetch } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: name,
      });
      refetch();
      toast.success("নাম সফলভাবে হালনাগাদ হয়েছে!");
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error("নাম হালনাগাদ করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#183027] mt-24">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
          <p className="mt-1 text-[#829087]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>
        <div className="rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#008a45] text-white font-bold text-xl uppercase">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{user?.name || "লোড হচ্ছে..."}</h2>
              <p className="text-sm text-[#829087]">{user?.email || ""}</p>
            </div>
          </div>
          <button onClick={handleSignOut}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 flex items-center gap-1.5"
          >
            <span>↪</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        <div className="rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            নাম হালনাগাদ করুন
          </h2>
          <form onSubmit={handleUpdateName} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input type="text" value={name}  onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-gray-900 outline-none focus:border-[#008a45] transition-colors"
                required
              />
            </div>
            <button type="submit" disabled={loading}
              className="rounded-xl bg-[#008a45] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-green-700/20 transition-all hover:bg-green-700 active:scale-95 disabled:opacity-50"
            >
              {loading ? "হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
};

export default ProfilePage;