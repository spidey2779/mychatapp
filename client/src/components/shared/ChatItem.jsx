/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import { StyledLink } from "../styles/StyledComponent";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { useNavigate, useParams } from "react-router-dom";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    if (params.chatId && params.chatId === _id) return;
    else navigate(`/chat/${_id}`);
  };
  return (
    <StyledLink
      to={`/chat/${_id}`}
      onClick={clickHandler}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      // onContextMenu={(e) => console.log(e)}
      sx={{ padding: 0 }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          position: "relative",
          color: sameSender ? "white" : "unset",
        }}
      >
        {/* avatar card */}
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </StyledLink>
  );
};

export default memo(ChatItem);
