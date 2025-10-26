import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Box, Stack } from '@mui/material'
import {BlogTitle} from "./BlogTitle"
import formatTimeAgo from "../lib/formatTimeAgo";

export function BlogPost({
  title,
  blogRootUrl,
  frontmatter,
  content,
}: {
  title?: string | undefined;
  blogRootUrl: string;
  frontmatter: any;
  content: string;
}) {
  return (
    <Stack spacing={2}>
      <BlogTitle title={title} />
      <Typography variant="body2" color="text.secondary">
        {formatTimeAgo(new Date(`${frontmatter.date}T00:00:00`)).toUpperCase()}
      </Typography>
      <Typography variant="h2">{frontmatter.title}</Typography>
      <article className="prose">
        <MDXRemote source={content} />
      </article>
      <Box sx={{ mb: 3 }}>
        <Link href={blogRootUrl} style={{ textDecoration: 'none' }}>
          <Typography color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            ← Back to {title ?? "Blog"}
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}
