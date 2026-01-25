import Link from "next/link";
import { Stack, Box, Typography, Divider } from "@mui/material";
import type { PostMeta } from "../lib/mdx";
import { PostCard } from "./PostCard";

export function BlogTagList({
  title,
  tag,
  blogRootUrl,
  showFullContent,
  posts,
}: {
  title?: string;
  tag: string;
  blogRootUrl: string;
  showFullContent?: boolean;
  posts: PostMeta[];
}) {
  if (!posts.length) return null;

  return (
    <Stack spacing={4}>
      {/* Tag heading */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Tag: {tag}
      </Typography>

      {/* Posts */}
      <Stack spacing={3}>
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            blogRootUrl={blogRootUrl}
            showFullContent={showFullContent ?? false}
            variant="featured" // all tag posts are same importance
          />
        ))}
      </Stack>

      {/* Back link */}
      <Box sx={{ mt: 3 }}>
        <Link href={blogRootUrl} style={{ textDecoration: "none" }}>
          <Typography
            color="primary"
            sx={{ "&:hover": { textDecoration: "underline" } }}
          >
            ← Back to {title ?? "Blog"}
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}
