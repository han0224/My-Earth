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
  try {
    const todo = new Todo({ userEamil: user.email, title: body.title });
    todo.save();
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

//id:id, status:number / status 변경
todoRouter.post("/setstatus", async (req, res) => {
  const body = req.body;
  try {
    await Todo.findByIdAndUpdate(body.id, { status: body.status });
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});

//id:id / todo 삭제
todoRouter.post("/delete", async (req, res) => {
  const body = req.body;
  try {
    await Todo.findByIdAndRemove(body.id).exec();
    return res.status(204).end();
  } catch (e) {
    return res.status(500).json({ err: e });
  }
});
module.exports = todoRouter;
