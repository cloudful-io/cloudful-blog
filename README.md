# cloudful-blog
A reusable blog component used for Next.js application

# 📝 cloudful-blog

**cloudful-blog** is a lightweight, file-based blog engine for Next.js projects.  It makes it easy to build dynamic blog pages from Markdown files stored locally (e.g., in `/public/blog`).  Perfect for changelogs, product updates, or developer journals — without needing a CMS.

---

## 🚀 Key Features

- 🗂️ Read blog posts directly from your `/public/blog` folder  
- ✍️ Parse Markdown + frontmatter (YAML) metadata  
- 🏷️ Support for tags, excerpts, and SEO metadata  
- 🧩 Ready-to-use React components for rendering posts and lists  
- ⚡ Compatible with **Next.js App Router** and **Static Site Generation (SSG)**

---

## 📦 Installation

```bash
npm install cloudful-blog
# or
yarn add cloudful-blog

---

## 📂 File Structure and Components

The blog routes are implemented using Next.js **App Router** convention with the following files under the `/app/blog` directory:

| File Path | Purpose | `cloudful-blog` Components/Functions Used |
| :--- | :--- | :--- |
| `/app/blog/page.tsx` | **Blog Index** (All Posts) | `getAllPosts`, `BlogList` |
| `/app/blog/[slug]/page.tsx` | **Single Post** (Post Detail) | `getAllPosts`, `getPostBySlug`, `BlogPost` |
| `/app/blog/tag/[tag]/page.tsx` | **Posts by Tag** (Filtered List) | `getPostsByTag`, `BlogTagList` |

---
