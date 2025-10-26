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
        width: {
          xs: '100%',   
          sm: '80%',    
          md: '70%',    
          lg: '60%',
        },
        height: "auto",
        borderRadius: 2,
        my: 2,
        borderTop: `2px solid ${theme.palette.primary.main}`,
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        borderRight: `2px solid ${theme.palette.primary.main}`,
        borderBottom: "none",
      }}
      {...props}
    />
  );
}
