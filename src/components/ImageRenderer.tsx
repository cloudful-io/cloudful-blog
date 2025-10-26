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
        borderTop: `5px solid ${theme.palette.primary.main}`,
        borderLeft: `5px solid ${theme.palette.primary.main}`,
        borderRight: `5px solid ${theme.palette.primary.main}`,
        borderBottom: "none",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
      {...props}
    />
  );
}
