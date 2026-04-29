"use client";
import React, { useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

export type AvatarDisplayProps = {
  username: string,
  profilePicUrl: string | undefined,
}

export function ProfilePic({ username, profilePicUrl }: AvatarDisplayProps) {
    const [src, setSrc] = useState(profilePicUrl ?? "");

    return (
        <div style={{ width: 64, height: 64, overflow: "hidden", borderRadius: "50%" }}>
          {src ?
              <Image
                alt={username + "'s profile pic"}
                height={64}
                width={64}
                onError={() => setSrc("")}
                src={src}
                style={{ objectFit: "cover", width: 64, height: 64 }}
              /> :
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: getAvatarColor(username),
                  fontSize: "30px",
                }}
              >
                {username[0]}
              </Avatar>}
        </div>
    );
}

// Generate a consistent color based on the username
const getAvatarColor = (name: string) => {
  const colors = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7',
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
  ];

  // Simple hash function to get a consistent index
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};