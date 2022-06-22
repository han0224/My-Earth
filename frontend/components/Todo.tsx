// 로그인 여부 확인
// 로그인 상태면 todo 목록 불러오기
// 로그인 상태가 아니면 '로그인 후 사용 가능합니다' 표시

import { useEffect, useState } from "react";
import { saveTodo, todoList } from "../apis/todo";
import styles from "../styles/Todo.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "../store";

// 로그인 상태일 시
// 추가 버튼, 삭제 버튼, 완료 버튼

interface ITodoList {
  _id: string;
  status: number;
  title: string;
}

const Todo = () => {
  const [todolist, setTodoList] = useState<ITodoList[]>([]);
  const { isUser } = useSelector((state: RootState) => state.user);
  console.log("asdfasdf", isUser);
  const test = () => {
    if (todolist.length === 5) {
      alert("5개 이상은 작성할 수 없습니다.");
    } else {
      saveTodo();
    }

    // todoList();
  };
  const getTodoList = async () => {
    const todo = await todoList();
    if (!todo.success) {
      console.log("실패");
      setTodoList([]);
    } else {
      setTodoList(todo.data);
      console.log("todo data", todo.data, typeof todo.data[0]._id);
    }
    console.log("todolist", todolist);
  };
  useEffect(() => {
    getTodoList();
  }, []);
  useEffect(() => {
    getTodoList();
  }, [isUser]);
  return (
    <div className={styles.todo}>
      <div className={styles.todoHeader}>
        {/* <AiOutlineMenu /> */}
        Todo List
      </div>
      <div className={styles.todoList}>
        {todolist.map((v) => (
          <div key={v._id}>
            <label>
              <div className={styles.todoItem}>
                <input type={"checkbox"}></input>
                <p>{v.title}</p>
              </div>
              <AiOutlineDelete className={styles.todoDelete} />
            </label>
          </div>
        ))}
        <button className={styles.todoButton} onClick={test}>
          + New task
        </button>
      </div>
    </div>
  );
};

export default Todo;
