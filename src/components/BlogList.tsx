import { Stack, Divider, Box } from "@mui/material";
import type { PostMeta } from "../lib/mdx";
import { PostCard } from "./PostCard";

export function BlogList({
  blogRootUrl,
  showFullContent,
  posts,
}: {
  blogRootUrl: string;
  showFullContent?: boolean;
  posts: PostMeta[];
}) {
  if (!posts.length) return null;

  const [featuredPost, ...restPosts] = posts;

  return (
    <Stack spacing={4}>
      {/* 🔝 Featured post */}
      {featuredPost && (
        <PostCard
          post={featuredPost}
          blogRootUrl={blogRootUrl}
          showFullContent={showFullContent ?? false}
          variant="featured"
        />
      )}
      {restPosts.length > 0 && (
        <>
          <Divider />
          {showFullContent ? (
            <Stack spacing={4}>
              {restPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  blogRootUrl={blogRootUrl}
                  showFullContent={showFullContent ?? false}
                  variant="featured"
                />
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                },
                gap: 4,
              }}
            >
              {restPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  blogRootUrl={blogRootUrl}
                  showFullContent={false}
                  variant="grid"
                />
              ))}
            </Box>
          )}
        </>
      )}
    </Stack>
  );
}
