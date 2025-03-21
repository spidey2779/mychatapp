import { Avatar, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";
import { useGetAdminStatsQuery } from "../../redux/api/api";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      return <AvatarCard avatar={params.row.avatar} />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => {
      return <AvatarCard max={100} avatar={params.row.members} />;
    },
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const { isLoading, data, error, isError } =
    useGetAdminStatsQuery("admin/chats");
  useErrors([{ isError, error }]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: chat.avatar.map((i) => transformImage(i, 50)),
          members: chat.members.map((member) => {
            return transformImage(member.avatar, 50);
          }),
          creator: {
            name: chat.creator.name,
            avatar: transformImage(chat.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table rows={rows} heading={"All Chats"} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
