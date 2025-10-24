import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Typography, Divider, Box, Stack } from '@mui/material'

export function BlogPost({
  frontmatter,
  content,
}: {
  frontmatter: any;
  content: string;
}) {
  return (
    <Stack spacing={2}>
      <Typography variant="h2" sx={{mb:2}}>Product Updates</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h3" gutterBottom>{frontmatter.title}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {new Date(`${frontmatter.date}T00:00:00`).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })}
      </Typography>
      <article className="prose">
        <MDXRemote source={content} />
      </article>
      <Box sx={{ mb: 3 }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Typography color="primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
            ← Back to Product Updates
          </Typography>
        </Link>
      </Box>
    </Stack>
  );
}
