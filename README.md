# 🌌 Meridian Blog

A modern, high-performance, and feature-rich blog platform built with the latest web technologies. **Meridian Blog** offers a seamless writing and reading experience with real-time capabilities and a stunning, adaptive design.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![Convex](https://img.shields.io/badge/Convex-FF5B00?style=for-the-badge&logo=convex&logoColor=white)](https://convex.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/) [![Better Auth](https://img.shields.io/badge/Better_Auth-3B82F6?style=for-the-badge&logo=auth0&logoColor=white)](https://better-auth.com/)

---

## ✨ Features

- 🚀 **Next.js 16 (App Router)**: Utilizing the latest performance optimizations, server components, and streaming.
- ⚡ **Real-time Backend**: Powered by **Convex** for instantaneous data sync and serverless architecture.
- 🔐 **Robust Authentication**: Secure and flexible auth powered by **Better Auth**.
- 🖼️ **Image Management**: Seamless file uploads and image hosting directly through Convex Storage.
- 💬 **Interactive Interactions**: Real-time commenting system to build community.
- 🎨 **Premium UI/UX**: Crafted with **Tailwind CSS 4** and **Shadcn UI** for a polished, modern look.
- 🌗 **Adaptive Theme**: Native dark mode support with smooth transitions via `next-themes`.
- 📱 **Fully Responsive**: Meticulously designed for mobile, tablet, and desktop views.
- 🛠️ **Type Safe**: End-to-end type safety with **TypeScript**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Database & Backend**: [Convex](https://convex.dev/)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Architecture**: [Shadcn UI](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Convex account for backend hosting

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/heykaran77/meridian-blog.git
   cd meridian-blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Convex Backend:**

   ```bash
   npx convex dev
   ```

   _Follow the prompts to link your project or create a new one._

4. **Add Environment Variables:** Create a `.env.local` file in the root directory and add your Convex and Better Auth keys:

   ```env
   CONVEX_DEPLOYMENT=...
   NEXT_PUBLIC_CONVEX_URL=...
   BETTER_AUTH_SECRET=...
   # Add any other required keys
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

- `app/`: Next.js App Router source (pages, layouts, actions).
- `convex/`: Backend schema, queries, mutations, and auth config.
- `components/`: Reusable UI components (Shadcn UI and custom components).
- `lib/`: Shared utility functions and database interaction logic.
- `public/`: Static assets like logos and images.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is [MIT](LICENSE) licensed.

---

Created with ❤️ by **Karan Singh**
