# বাজার দর (Bazar Dor) — Live Grocery Market Price Tracker

বাজার দর is a modern Next.js App Router web application that tracks and displays live daily grocery and market prices in Bangladesh.
Check it Live : https://bazar-dor-six-eta.vercel.app/


---

## 🚀 Key Features

* **🔝 Navigation & Ticker:** Features a logo with current Bengali date, dynamic category navigation, user session controls (**UserInfo**), and an infinite scrolling live price ticker (marquee).
* **🅱️ Hero Banner:** Highlights a primary CTA button that smooth-scrolls users directly to the `#সব-পণ্য` section.
* **⚖️ Home Page Product Sections:** 
  * Section A & B: Top 6 price risers (▲) and fallers (▼).
  * Section C ("সব পণ্য"): Comprehensive responsive product grid with Bengali numerals and color-coded trend badges.
* **🧭 Product Details (`/product/[slug]`):** Protected route showing price statistics (min, max, average) and market-wise price breakdowns.
* **🏷️ Category Pages (`/category/[slug]`):** Includes sorting controls, skeleton loaders, and empty states.
* **🔐 Authentication:** Powered by **Better Auth** (email/password, Google, and GitHub social logins) with toast notifications (`react-hot-toast`).
* **🦶 Footer & Responsiveness:** Clean footer disclaimers and fully responsive layouts across mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS, DaisyUI
* **Database & Auth:** MongoDB (`bazar-dor-2`), Better Auth (`@better-auth/mongo-adapter`)
* **Feedback:** `react-hot-toast`

---
