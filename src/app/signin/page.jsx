"use client"
import Link from "next/link";
import {authClient} from '@/lib/auth-client'
import {toast} from 'react-hot-toast'

const SignInPage = () => {
          const onSubmit = async(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const user = Object.fromEntries(formData.entries());
              const {data, error} = await authClient.signIn.email({
                  ...user, 
                  callbackURL: "/"
              })
              if (data) {
                  toast.success("Signed In Successfully")
              }
              if(error){
                  toast.error(error.message);
              }
          }
  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 pt-6 text-[#183027] mt-20 pt-20">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">সাইন ইন</h1>
          <p className="mt-1 text-[#829087]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e1e9e2] bg-[#fbfdfb] p-6">
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block">ইমেইল</label>
              <input type="email" name="email" placeholder="you@example.com" className="input w-full bg-transparent" required/>
            </div>

            <div>
              <label className="mb-1 block">পাসওয়ার্ড</label>
              <input type="password" name="password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full bg-transparent" required/>
            </div>

            <button type="submit" className="btn mt-1 w-full border-none bg-[#07883f] text-white hover:bg-[#067535]">
              সাইন ইন
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <hr className="flex-1 border-[#e1e7e2]" />
            <span className="text-sm">অথবা</span>
            <hr className="flex-1 border-[#e1e7e2]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="btn btn-outline btn-sm py-5">
              🇬 Google দিয়ে
              <br />
              চালিয়ে যান
            </button>

            <button className="btn btn-outline btn-sm py-5">
              ◉ GitHub দিয়ে
              <br />
              চালিয়ে যান
            </button>
          </div>

          <div className="mt-4 text-center text-sm text-[#829087]">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/signup" className="text-[#07883f] underline">
              সাইন আপ করুন
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

export default SignInPage;