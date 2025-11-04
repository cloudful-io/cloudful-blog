"use client";

import { useState } from "react";
import { Box, useTheme, useMediaQuery, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ImageRenderer(props: any) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { src, alt } = props;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {/* Clickable image */}
      <Box
        component="img"
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        sx={{
          display: "block",
          mx: "auto",
          width: {
            xs: "100%",
            sm: "80%",
            md: "70%",
            lg: "60%",
          },
          height: "auto",
          my: 2,
          borderTop: `5px solid ${theme.palette.primary.main}`,
          borderLeft: `5px solid ${theme.palette.primary.main}`,
          borderRight: `5px solid ${theme.palette.primary.main}`,
          borderBottom: "none",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      />

      {/* Lightbox */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={isMobile}
        maxWidth="xl"
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "white",
            zIndex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            maxWidth: isMobile ? "98vw" : "90vw",
            maxHeight: isMobile ? "98vw" : "90vw",
            margin: "auto",
            display: "block",
            borderRadius: 2,
            boxShadow: 3,
          }}
        />
      </Dialog>
    </>
  );
}
