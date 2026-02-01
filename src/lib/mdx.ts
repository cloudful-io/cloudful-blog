import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featuredImage?: string;
  tags?: { name: string; slug: string }[];
  author?: {
    name: string;
    picture: string;
  } | undefined;
  mdxSource?: string;
};

export const getAllPosts = (dir: string, withContent = false): PostMeta[] => {
  const files = fs.readdirSync(dir);
  return files
    .map((filename) => parsePostFile(path.join(dir, filename), withContent))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostsByTag = (dir: string, tagSlug: string, withContent = false): PostMeta[] => {
  const files = fs.readdirSync(dir);

  return files
    .map((filename) => parsePostFile(path.join(dir, filename), withContent))
    .filter((post) =>
      post.tags?.some((t: any) => t.slug === tagSlug)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (dir: string, slug: string) => {
  const filePath = path.join(dir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  return { frontmatter: data, content };
}; 

export const calculateReadingTime = (text: string, wordsPerMinute = 240): number => {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

function parsePostFile(filePath: string, withContent = false): PostMeta {
  const filename = path.basename(filePath);
  const slug = filename.replace(/\.mdx?$/, "");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const author =
    typeof data.author === "object"
      ? {
          name: data.author.name || "",
          picture: data.author.picture || "",
        }
      : undefined;

  const tags = Array.isArray(data.tags)
  ? data.tags.map((t: unknown) => ({
      name: String(t),
      slug: String(t).toLowerCase().replace(/\s+/g, "-"),
    }))
  : [];

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "1970-01-01",
    summary: data.summary || "",
    featuredImage: data.featuredImage || undefined,
    author,
    tags,
    ...(withContent ? { mdxSource: content } : {}),
  };
}