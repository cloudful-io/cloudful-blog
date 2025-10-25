import { Typography, Divider } from '@mui/material'

export function BlogTitle({
  title,
}: {
  title?: string | undefined;
}) {
  return (
    <>
      <Typography variant="h2">{title ?? "Blog"}</Typography>
      <Divider sx={{ my: 2 }} />
    </>
  );
}
