import Link from "next/link";
import { Box, Chip } from "@mui/material";

interface TagListProps {
  tags?: string[] | undefined;
  blogRootUrl: string; 
  onTagClick?: (tag: string) => void; 
}

export function TagList({ tags = [], blogRootUrl, onTagClick }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {tags.map((tag) => (
        <Link key={tag} href={`${blogRootUrl}/tags/${encodeURIComponent(tag)}`} passHref>
          <Chip
            label={tag}
            clickable
            onClick={(e) => {
              if (onTagClick) {
                e.preventDefault();
                onTagClick(tag);
              }
            }}
          />
        </Link>
      ))}
    </Box>
  );
}
