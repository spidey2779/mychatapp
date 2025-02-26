/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttchment from "./RenderAttchment";
const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={600} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {/* Attachments */}
      {attachments.length > 0 &&
        attachments.map((attachment) => {
          const url = attachment.url;
          const file = fileFormat(url);
          // console.log(url);
          return (
            <Box key={url}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttchment(file, url)}
                {/* {<RenderAttchment file={file} url={url}/>} */}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color={"text.secondary"}>
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
