import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Box, Divider, Typography, Stack } from "@mui/material";
import type { PostMeta } from "../lib/mdx";
import AuthorInfo from "./AuthorInfo";
import { TagList } from "./TagList";
import formatTimeAgo from "../lib/formatTimeAgo";
import { calculateReadingTime } from "../lib/mdx";
import ImageRenderer from "./ImageRenderer";
import LinkRenderer from "./LinkRenderer";

const components = {
  img: ImageRenderer,
  a: LinkRenderer,
};

export type PostCardVariant = "featured" | "grid";

export function PostCard({
  post,
  blogRootUrl,
  showFullContent = false,
  variant = "featured",
}: {
  post: PostMeta;
  blogRootUrl: string;
  showFullContent?: boolean;
  variant?: PostCardVariant;
}) {
  const isGrid = variant === "grid";

  return (
    <Stack spacing={1.5}>
      <Typography variant="body2" color="text.secondary">
        {formatTimeAgo(new Date(`${post.date}T00:00:00`)).toUpperCase()} ·{" "}
        {`${calculateReadingTime(post.mdxSource || "")} MIN READ`}
      </Typography>

      <Typography variant={isGrid ? "h3" : "h2"}>
        {post.title}
      </Typography>

      {!isGrid && (
        <AuthorInfo
          name={post.author?.name}
          picture={post.author?.picture}
        />
      )}

      <TagList blogRootUrl={blogRootUrl} tags={post.tags} />

      {showFullContent ? (
        <article className="prose prose-lg mt-2">
          <MDXRemote source={post.mdxSource!} components={components} />
        </article>
      ) : (
        <>
          {post.featuredImage && (
            <Box 
              sx={{
                width: isGrid ? "100%" : "auto",
                aspectRatio: isGrid ? "16 / 9" : "auto",
                overflow: isGrid ? "hidden" : "auto",
                borderRadius: isGrid ? 2 : 4,
                mb: 2,
                backgroundColor: isGrid ? "action.hover" : "inherit",
                display: isGrid ? "block" : "flex",
                justifyContent: isGrid ? undefined : "center",
              }}>
              {variant === "grid" ? (
                // Grid variant → fixed aspect ratio, crop if needed
                <Box
                  component="img"
                  src={post.featuredImage}
                  alt={post.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    backgroundColor: "inherit",
                    borderRadius: 2,
                  }}
                />
              ) : (
                // Featured variant → dynamic width, natural height
                <Box
                  component="img"
                  src={post.featuredImage}
                  alt={post.title}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "80%",
                      md: "70%",
                      lg: "60%",
                    },
                    height: "auto",
                    borderRadius: 2,
                  }}
                />
              )}
            </Box>
          )}

          {post.summary && (
            <Typography
              variant="body1"
              color="text.secondary"
            >
              {post.summary}
            </Typography>
          )}

          <Link href={`${blogRootUrl}/${post.slug}`} style={{ textDecoration: 'none' }}>
            <Typography color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
              Read more →
            </Typography>
          </Link>
          <Divider/>
        </>
      )}
    </Stack>
  );
}
