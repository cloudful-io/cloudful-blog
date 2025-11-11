"use client";

import Link from "next/link";
import { useTheme } from "@mui/material";

export default function LinkRenderer(props: any) {
  const theme = useTheme();
  const { href, children } = props;

  return (
    <Link
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        color: theme.palette.mode === "dark"
          ? theme.palette.primary.light
          : theme.palette.primary.main,
        textDecoration: "none",
        fontWeight: 500,
        transition: "color 0.2s ease-in-out",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.textDecoration = "underline")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.textDecoration = "none")
      }
    >
      {children}
    </Link>
  );
}
