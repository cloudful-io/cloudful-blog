import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export const getAllPosts = (dir: string): PostMeta[] => {
  const files = fs.readdirSync(dir);

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const fullPath = path.join(dir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        summary: data.summary || "",
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
