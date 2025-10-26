"use client";

import { Box, useTheme } from "@mui/material";

export default function ImageRenderer(props: any) {
  const theme = useTheme();
  return (
    <Box
      component="img"
      sx={{
        display: "block",
        mx: "auto",
        maxWidth: "60%",
        height: "auto",
        borderRadius: 2,
        my: 2,
        border: `1px solid ${theme.palette.primary.main}`,
      }}
      {...props}
    />
  );
}
