"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const router = useRouter();
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });
    if (data) {
      toast.success("Signed Up Successfully");
      router.push("/");
    }
    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubSignUp = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 pt-6 text-[#183027] mt-20 pt-20">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-1 text-[#829087]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-6 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block">নাম</label>
              <input
                type="text"
                name="name"
                placeholder="আপনার নাম"
                className="input w-full bg-transparent border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">ইমেইল</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input w-full bg-transparent border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">পাসওয়ার্ড</label>
              <input
                type="password"
                name="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="input w-full bg-transparent border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>
            <div>
              <label className="mb-1 block">পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="আবার লিখুন"
                className="input w-full bg-transparent border border-gray-200 rounded-xl px-4 py-2.5"
                required
              />
            </div>
            <button
              type="submit"
              className="btn mt-1 w-full border-none bg-[#07883f] text-white hover:bg-[#067535] py-2.5 rounded-xl font-bold"
            >
              সাইন আপ
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <hr className="flex-1 border-[#e1e7e2]" />
            <span className="text-sm">অথবা</span>
            <hr className="flex-1 border-[#e1e7e2]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={handleGoogleSignUp} type="button" className="btn btn-outline btn-sm py-5 rounded-xl border border-gray-200">
              🇬 Google দিয়ে
              <br />
              চালিয়ে যান
            </button>
            <button onClick={handleGithubSignUp} type="button" className="btn btn-outline btn-sm py-5 rounded-xl border border-gray-200">
              ◉ GitHub দিয়ে
              <br />
              চালিয়ে যান
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-[#829087]">
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/signin" className="text-[#07883f] underline">
              সাইন ইন করুন
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-[#829087] underline">
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;