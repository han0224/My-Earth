// 로그인 여부 확인
// 로그인 상태면 todo 목록 불러오기
// 로그인 상태가 아니면 '로그인 후 사용 가능합니다' 표시

import React, { useEffect, useRef, useState } from "react";
import { saveTodo, setstatus, todoDelete, todoList } from "../apis/todo";
import styles from "../styles/Todo.module.css";
import { AiOutlineDelete, AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { MdAdd } from "react-icons/md";
import useInput from "../hooks/useInput";
import { deleteUser } from "../store/user";
import { initTimer } from "../store/timer";
import { useRouter } from "next/router";

// 로그인 상태일 시
// 추가 버튼, 삭제 버튼, 완료 버튼

interface ITodoList {
  _id: string;
  status: number;
  title: string;
}

const Todo = () => {
  const [todolist, setTodoList] = useState<ITodoList[]>([]);
  const [open, setOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(true);
  const { isUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const title = useInput("");
  const ref = useRef<HTMLDivElement>(null);

  const addTodo = async () => {
    if (!isUser) {
      alert("로그인 후 이용가능 합니다");
    } else {
      if (todolist.length === 5) {
        alert("5개 이상은 작성할 수 없습니다.");
      } else {
        await saveTodo(title.value);
        await getTodoList();
        title.onChange("");
        setOpen(false);
      }
    }
  };

  const setStatus = async (id: string, status: number) => {
    await setstatus(id, status === 1 ? 0 : 1);
    const newtodo = todolist.map((v) => {
      if (v._id === id) {
        return { _id: v._id, status: v.status === 1 ? 0 : 1, title: v.title };
      }
      return v;
    });
    setTodoList(newtodo);
  };

  const showBox = () => {
    if (todolist.length === 5) {
      alert("5개 이상은 작성할 수 없습니다.");
    } else {
      setOpen(!open);
      title.onChange("");
    }
  };

  const setDelete = (id: string) => {
    todoDelete(id);
    const tt = todolist.filter((v) => v._id != id);
    setTodoList(tt);
  };

  const getTodoList = async () => {
    const todo = await todoList();
    if (todo.success) {
      setTodoList(todo.data.data);
    } else {
      dispatch(deleteUser());
      dispatch(initTimer());
      router.push("/");
      alert(todo.err);
    }
  };

  useEffect(() => {
    // 2번 실행됨.
    // React.StrictMode 이것때문
    // 잠재적인 문제를 알아내기 위한 도구로 개발모드에서만 영향을 끼침
    // 없애고 싶으면 app에서 지우면 되는데 next에서는 next.config.js 에서 이 설정이 true로 설정되어 있다.
    if (isUser) {
      getTodoList();
    } else {
      setTodoList([]);
    }
  }, [isUser]);

  return (
    <div className={styles.todo}>
      <button
        className={styles.todoHeader}
        onClick={() => setIsListOpen(!isListOpen)}
      >
        <AiOutlineMenu className={styles.icon} />
        <p>Todo List</p>
      </button>
      {/* {isListOpen ? ( */}
      <div className={isListOpen ? styles.todoList : styles.closeTodoList}>
        {todolist.length > 0 &&
          todolist.map((v) => (
            <div key={v._id}>
              <label className={styles.todolabel}>
                <div className={styles.todoItem}>
                  <input
                    type={"checkbox"}
                    onClick={(e) => {
                      setStatus(v._id, v.status);
                    }}
                    defaultChecked={v.status === 1 ? true : false}
                  ></input>
                  <p>{v.title}</p>
                </div>
                <AiOutlineDelete
                  className={styles.todoDelete}
                  onClick={(e) => {
                    setDelete(v._id);
                  }}
                />
              </label>
            </div>
          ))}
        {open ? (
          <div className={styles.addBox} ref={ref}>
            <input type={"text"} {...title} />
            <button onClick={addTodo}>
              <MdAdd />
            </button>
          </div>
        ) : (
          <></>
        )}

        <button className={styles.todoButton} onClick={showBox}>
          + New task
        </button>
      </div>
      {/* // ) : (
      //   <></>
      // )} */}
    </div>
  );
};

export default Todo;
