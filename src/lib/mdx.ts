import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags?: string[];
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

export const getPostsByTag = (dir: string, tag: string, withContent = false): PostMeta[] => {
  const files = fs.readdirSync(dir);
  const normalizedTag = tag.toLowerCase();

  return files
    .map((filename) => parsePostFile(path.join(dir, filename), withContent))
    .filter((post) => post.tags?.includes(normalizedTag))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const getPostBySlug = (dir: string, slug: string) => {
  const filePath = path.join(dir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  return { frontmatter: data, content };
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
    ? data.tags.map((t: unknown) => String(t).toLowerCase())
    : [];

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || "1970-01-01",
    summary: data.summary || "",
    author,
    tags,
    ...(withContent ? { mdxSource: content } : {}),
  };
}