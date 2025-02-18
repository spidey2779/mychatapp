import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "../../constants/color";
import {
  Add,
  Group,
  Logout,
  Menu,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
const SearchDialog = lazy(()=>import("../specific/Search"))
const NotificationDialog = lazy(()=>import("../specific/Notifications"))
const NewGroupDialog = lazy(()=>import("../specific/NewGroups"))

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearchDialog = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const logoutHandler = () => {
    console.log("logoutHandler");
  };
  const navigateToGroup = () => {
    navigate("/groups");
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              Chattu
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                Icon={SearchIcon}
                onClick={openSearchDialog}
                title={"Search"}
              />
              <IconBtn Icon={Add} onClick={openNewGroup} title={"New Group"} />
              <IconBtn
                Icon={Group}
                onClick={navigateToGroup}
                title={"Manage Group"}
              />
              <IconBtn
                Icon={Notifications}
                onClick={openNotification}
                title={"Notifications"}
              />
              <IconBtn Icon={Logout} onClick={logoutHandler} title={"Logout"} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
            <Suspense fallback={<Backdrop open/>}>

          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
               <Suspense fallback={<Backdrop open/>}>

          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};
// eslint-disable-next-line react/prop-types
const IconBtn = ({ title, Icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};
export default Header;
