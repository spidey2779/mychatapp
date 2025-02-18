import { useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampledata";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Header from "./Header";
import Grid from "@mui/material/Grid2";
import Profile from "../specific/Profile";

const AppLayout = () => (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    const chatId = params.chatId;
    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
    };
    return (
      <>
        <Title title={"Chat App"} />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"} spacing={0}>
          <Grid
            size={{ sm: 4, md: 3 }}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              newMessagesAlert={[{ chatId, count: 4 }]}
              onlineUsers={["1", "2"]}
              handleDeleteChat={(e) => handleDeleteChat(e, _id, groupChat)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            size={{ md: 4, lg: 3 }}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
