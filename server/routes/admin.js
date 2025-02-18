import express from "express";

const app = express.Router();

app.get("/");
app.get("/verify");
app.get("/logout");
app.get("/users");
app.get("/chats");
app.get("/messages");
app.get("/stats");
export default app;
