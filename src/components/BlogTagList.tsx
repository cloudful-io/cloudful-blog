import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Stack, Box, Divider } from "@mui/material";
import type { PostMeta } from "../lib/mdx"
import ImageRenderer from "./ImageRenderer";
import LinkRenderer from "./LinkRenderer";
import AuthorInfo from "./AuthorInfo";
import { TagList } from "./TagList";
import formatTimeAgo from "../lib/formatTimeAgo";

export function BlogTagList({ 
  title,
  tag,
  blogRootUrl,
  showFullContent,
  posts
 }: { 
  title?: string | undefined,
  tag: string,
  blogRootUrl : string,
  showFullContent?: boolean,
  posts: PostMeta[] 
}) {

  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Tag: {tag}
      </Typography>
      {posts.map((post, index) => (
          <div key={post.slug}>
            <Typography variant="body2" color="text.secondary">
              {formatTimeAgo(new Date(`${post.date}T00:00:00`)).toUpperCase()}
            </Typography>
            <Typography variant="h2">{post.title}</Typography>
            <AuthorInfo
              name={post.author?.name}
              picture={post.author?.picture}
            />
            <TagList blogRootUrl={blogRootUrl} tags={post.tags} />
            {showFullContent ? (
              <article className="prose mt-2">
                <MDXRemote source={post.mdxSource!} components={components} />
              </article>
            ) : (
                <div key={`${post.slug}-${index}`}>
                  {post.summary && (
                    <Typography variant="body1" sx={{my:1}}>{post.summary}</Typography>
                  )}
                  <Link href={`${blogRootUrl}/${post.slug}`}>Read more →</Link>
                </div>
            )}
            {index < (posts.length-1) && (
              <Divider sx={{ my: 2 }} />
            )}
          </div>
      ))}
      <Box sx={{ mb: 3 }}>
        <Link href={blogRootUrl} style={{ textDecoration: 'none' }}>
          <Typography color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            ← Back to {title ?? "Blog"}
          </Typography>
        </Link>
      </Box>
    </Stack>
  )
}
const components = { img: ImageRenderer, a: LinkRenderer };