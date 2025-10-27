import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  author?: {
    name: string;
    picture: string;
  } | undefined;
  mdxSource?: string;
};

export const getAllPosts = (dir: string, withContent = false): PostMeta[] => {
  const files = fs.readdirSync(dir);

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const fullPath = path.join(dir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { content, data } = matter(fileContents);
      const author =
        typeof data.author === "object"
          ? {
              name: data.author.name || "",
              picture: data.author.picture || "",
            }
          : undefined;

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        author,
        summary: data.summary || "",
        ...(withContent
          ? { mdxSource: content }
          : {}),
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getPostBySlug = (dir: string, slug: string) => {
  const filePath = path.join(dir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  return { frontmatter: data, content };
}; 
