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
```

 ```bash
yarn add cloudful-blog
```
---

## 🧑‍💻 Usage

To integrate your blog, you’ll create **three pages** under your Next.js `app` directory.  
These pages leverage the reusable components and helper functions provided by **cloudful-blog**.

---

### 1️⃣ `/app/blog/page.tsx` — Blog List Page

Lists all blog posts, sorted by date.

```tsx
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getAllPosts, BlogList } from "cloudful-blog"
import path from "path";

export default function BlogPage() {
  const posts = getAllPosts(path.join(process.cwd(), "/public/blog"), true).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PageContainer title="Product Updates" description="Typing Help: Product Updates" showTitle>
      <BlogList
        posts={posts}
        blogRootUrl="/blog"
        title="Product Updates"
        showFullContent
      />
    </PageContainer>
  );
}
```

✅ **Key functions:**
- `getAllPosts(directory, includeTags)` – Loads all blog posts with optional tag info.  
- `BlogList` – Displays a list or grid of posts with metadata.

---

### 2️⃣ `/app/blog/[slug]/page.tsx` — Individual Post Page

Displays a single post based on its slug.

```tsx
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import path from "path";
import { getAllPosts, getPostBySlug, BlogPost } from "cloudful-blog";

export async function generateStaticParams() {
  const posts = getAllPosts(path.join(process.cwd(), "/public/blog"));
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const { frontmatter, content } = getPostBySlug(path.join(process.cwd(), "/public/blog"), slug);

  return (
    <PageContainer title={frontmatter.title} description={frontmatter.excerpt} showTitle>
      <BlogPost
        frontmatter={frontmatter}
        content={content}
        blogRootUrl="/blog"
        title="Product Updates"
      />
    </PageContainer>
  );
}
```

✅ **Key functions:**
- `getPostBySlug(directory, slug)` – Loads a single post’s content and frontmatter.  
- `BlogPost` – Renders Markdown + metadata for the post.

---

### 3️⃣ `/app/blog/tag/[tag]/page.tsx` — Tag Filter Page

Lists posts filtered by tag.

```tsx
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { getPostsByTag, BlogTagList } from "cloudful-blog";
import path from "path";

export default async function BlogTagPage(props: { params: Promise<{ tag: string }> }) {
  const { tag } = await props.params;
  const posts = getPostsByTag(path.join(process.cwd(), "/public/blog"), tag, true).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <PageContainer title={`Product Updates - ${tag}`} description={`Posts tagged with ${tag}`} showTitle>
      <BlogTagList
        posts={posts}
        blogRootUrl="/blog"
        title="Product Updates"
        tag={tag}
        showFullContent
      />
    </PageContainer>
  );
}
```

✅ **Key functions:**
- `getPostsByTag(directory, tag)` – Filters posts matching the given tag.  
- `BlogTagList` – Displays all posts under the selected tag.

---

### 🧩 Components Overview

| Component | Description | Typical Use |
|------------|--------------|--------------|
| `BlogList` | Lists all blog posts | `/blog/page.tsx` |
| `BlogPost` | Displays a single post | `/blog/[slug]/page.tsx` |
| `BlogTagList` | Lists posts filtered by a tag | `/blog/tag/[tag]/page.tsx` |

---

## 📁 Example Folder Structure

```
my-app/
├── app/
│   ├── blog/
│   │   ├── [slug]/page.tsx
│   │   ├── tag/[tag]/page.tsx
│   │   └── page.tsx
├── public/
│   └── blog/
│       ├── post-1.md
│       ├── post-2.md
│       └── post-3.md
└── package.json
```

Each `.md` file under `/public/blog` should include frontmatter metadata, e.g.:

```md
---
title: "Introducing the Word Rain Game"
date: "2025-02-10"
excerpt: "We’re excited to launch our new Word Rain typing challenge!"
tags: ["typing", "games", "update"]
---

Your post content in **Markdown** goes here.
```

---

## 🧰 API Summary

| Function | Description |
|-----------|--------------|
| `getAllPosts(path, includeTags)` | Returns an array of all blog posts with metadata |
| `getPostBySlug(path, slug)` | Returns frontmatter and content for a specific post |
| `getPostsByTag(path, tag)` | Filters posts that contain a specific tag |

---

## 💡 Tips

- Markdown files should include frontmatter at the top.  
- You can host media (images, videos) inside `/public/blog/assets`.  
- The components are fully compatible with **Next.js App Router** and **MDX** (if desired).

---

## 🧾 License

MIT © Cloudful Labs