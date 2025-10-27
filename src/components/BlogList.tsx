import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Stack, Divider } from "@mui/material";
import type { PostMeta } from "../lib/mdx"
import {BlogTitle} from "./BlogTitle"
import ImageRenderer from "./ImageRenderer";
import AuthorInfo from "./AuthorInfo";
import formatTimeAgo from "../lib/formatTimeAgo";

export function BlogList({ 
  title,
  blogRootUrl,
  showFullContent,
  posts
 }: { 
  title?: string | undefined,
  blogRootUrl : string,
  showFullContent?: boolean,
  posts: PostMeta[] 
}) {

  return (
    <Stack spacing={2}>
      <BlogTitle title={title} />
      {posts.map((post, index) => (
          <div key={post.slug}>
            <Typography variant="body2" color="text.secondary">
              {formatTimeAgo(new Date(`${post.date}T00:00:00`)).toUpperCase()}
            </Typography>
            <Typography variant="h2">{post.title}</Typography>
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
            <AuthorInfo
              name={post.author?.name}
              picture={post.author?.picture}
            />
            {index < (posts.length-1) && (
              <Divider sx={{ my: 2 }} />
            )}
          </div>
      ))}
    </Stack>
  )
}
const components = { img: ImageRenderer };