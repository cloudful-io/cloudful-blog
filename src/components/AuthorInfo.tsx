"use client";
import { Stack, Avatar, Typography } from "@mui/material";

export default function AuthorInfo({
  name,
  picture,
}: {
  name?: string | undefined;
  picture?: string | undefined;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{ my: 1 }}
    >
      {picture && (
        <Avatar
          src={picture}
          alt={name!}
          sx={{ width: 36, height: 36 }}
        />
      )}
      <Stack>
        {name && (
          <Typography variant="body2" color="text.secondary">
            {name}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
