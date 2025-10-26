import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Box, Stack, useTheme } from '@mui/material'
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
        <MDXRemote source={content} components={components}/>
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

const components = {
  img: (props: any) => (
    <Box
      component="img"
      sx={{
        display: "block",
        mx: "auto",
        maxWidth: "60%",
        height: "auto",
        borderRadius: 2,
        my: 2,
        border: "2px solid var(--mui-palette-primary-main)", 
      }}
      {...props}
    />
  ),
};