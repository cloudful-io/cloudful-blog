import Link from "next/link";
import { Box, Chip } from "@mui/material";

interface TagListProps {
  tags?: string[] | undefined;
  blogRootUrl: string; 
}

export function TagList({ tags = [], blogRootUrl }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
      {tags.map((tag) => (
        <Link key={tag} href={`${blogRootUrl}/tags/${encodeURIComponent(tag)}`} passHref>
          <Chip
            label={tag}
            variant="outlined"  
            color="primary"
            size="small"
            clickable    
          />
        </Link>
      ))}
    </Box>
  );
}
