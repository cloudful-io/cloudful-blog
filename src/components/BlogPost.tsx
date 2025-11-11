import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Box, Stack, useTheme } from '@mui/material'
import ImageRenderer from "./ImageRenderer";
import LinkRenderer from "./LinkRenderer";
import AuthorInfo from "./AuthorInfo";
import { TagList } from "./TagList";
import formatTimeAgo from "../lib/formatTimeAgo";
import { calculateReadingTime } from "../lib/mdx";

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
  const minRead = calculateReadingTime(content);
  return (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {formatTimeAgo(new Date(`${frontmatter.date}T00:00:00`)).toUpperCase()} ·
        {` ${minRead} MIN READ`}
      </Typography>
      <Typography variant="h2">{frontmatter.title}</Typography>
      <AuthorInfo
        name={frontmatter.author?.name}
        picture={frontmatter.author?.picture}
      />
      <TagList blogRootUrl={blogRootUrl} tags={frontmatter.tags} />
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

const components = { img: ImageRenderer, a: LinkRenderer };