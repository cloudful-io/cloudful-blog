"use client";
import Link from "next/link";
import { Typography, Stack } from "@mui/material";
import type { PostMeta } from "../lib/mdx"
import {BlogTitle} from "./BlogTitle"
import formatTimeAgo from "../lib/formatTimeAgo";

export function BlogList({ 
  title,
  blogRootUrl,
  posts
 }: { 
  title?: string | undefined,
  blogRootUrl : string,
  posts: PostMeta[] 
}) {

  return (
    <Stack spacing={2}>
      <BlogTitle title={title} />
      {posts.map((post) => (
          <div key={post.slug}>
            <Typography variant="body2" color="text.secondary">
              {formatTimeAgo(new Date(`${post.date}T00:00:00`)).toUpperCase()}
            </Typography>
            <Typography variant="h2">{post.title}</Typography>
            <Typography variant="body1" sx={{my:1}}>{post.summary}</Typography>
            <Link href={`${blogRootUrl}/${post.slug}`}>Read more →</Link>
          </div>
      ))}
    </Stack>
  )
}