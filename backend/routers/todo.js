const express = require("express");
const { Todo } = require("../models/Todo");
const { auth } = require("../middleware/auth");

const todoRouter = express.Router();

todoRouter.get("/", (req, res) => {
  res.send("todo");
});

// 전체 가져오기
todoRouter.get("/todolist", auth, async (req, res) => {
  const user = req.user;
  const todolist = await Todo.find(
    { userEamil: user.email },
    { userEamil: 0, __v: 0 }
  );
  res.json({ success: true, data: todolist });
});

//title:string / 새로운 todo 저장
todoRouter.post("/savetodo", auth, (req, res) => {
  const user = req.user;
  const body = req.body;
  const todo = new Todo({ userEamil: user.email, title: body.title });
  todo.save();
});

//id:id, status:number / status 변경
todoRouter.post("/setstatus", (req, res) => {});

//id:id / todo 삭제
todoRouter.post("/delete", (req, res) => {});
module.exports = todoRouter;
