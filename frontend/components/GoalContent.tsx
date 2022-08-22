import { useEffect, useRef, useState } from "react";
import styles from "../styles/GoalContent.module.css";

interface Pros {
  goal: string;
}
interface itemType {
  id: string;
  title: string;
  content: string;
}
const GoalContent = (pros: Pros) => {
  const [todoIndex, setTodoIndex] = useState(-1);
  const [doIndex, setDoIndex] = useState(-1);
  const [doneIndex, setDoneIndex] = useState(-1);

  const [todoTmp, setTodoTmp] = useState<Array<itemType>>([]);
  const [doTmp, setDoTmp] = useState<Array<itemType>>([]);
  const [doneTmp, setDoneTmp] = useState<Array<itemType>>([]);

  const todoRef = useRef(null);
  const doRef = useRef(null);
  const doneRef = useRef(null);

  // https://inpa.tistory.com/entry/%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD-Drag-Drop-%EA%B8%B0%EB%8A%A5#top
  // drag 참고

  const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const childNode = target.childNodes[0] as HTMLInputElement;
    const id = childNode.id;
    setTodoIndex(todoTmp.findIndex((v) => v.id === id));
    setDoIndex(doTmp.findIndex((v) => v.id === id));
    setDoneIndex(doneTmp.findIndex((v) => v.id === id));
  };

  const dragenter = () => {
    // console.log("드래그 요소가 영역에 들어옴");
  };

  const dragover = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    const { target } = e;
    const { clientX } = e;

    // 영역에 계속 위치하면 발생하는 이벤트
    // HTML 요소는 다른 요소의 위에 위치할 수 없음
    // 따라서 다른 요소 위에 위치할 수 있도록 만들기 위해서는 놓일 장소에 이쓴요소의 기본 동작을 막아야함
    // -> event.prevenDefault 메소드 호출로 설정
    // drop, dragover 이벤트는 필수로 사용해야 함
    // dragover 이벤트를 적용하지 않으면 drop 이벤트 작동 X
  };

  const drop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();

    const [index, before] =
      todoIndex !== -1
        ? [todoIndex, "todo"]
        : doIndex !== -1
        ? [doIndex, "do"]
        : [doneIndex, "done"];
    if (type === before) {
      return;
    }
    const item = deleteItem(index, before);
    insertItem(item, type);
  };
  const deleteItem = (index: number, type: string) => {
    let item = { id: "", title: "", content: "" };
    switch (type) {
      case "todo":
        item = todoTmp[index];
        setTodoTmp(todoTmp.filter((v) => v !== item));
        break;
      case "do":
        item = doTmp[index];
        setDoTmp(doTmp.filter((v) => v !== item));
        break;
      case "done":
        item = doneTmp[index];
        setDoneTmp(doneTmp.filter((v) => v !== item));
        break;
      default:
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!", index, type);
        break;
    }
    return item;
  };
  const insertItem = (item: itemType, type: string) => {
    if (item === undefined) {
      console.log("undefined");
      return;
    }
    switch (type) {
      case "todo":
        setTodoTmp([...todoTmp, item]);
        break;
      case "do":
        setDoTmp([...doTmp, item]);
        break;
      case "done":
        setDoneTmp([...doneTmp, item]);
        break;
      default:
        console.log("!!!!!!!!1insert, default");
        break;
    }
  };

  useEffect(() => {
    setTodoTmp([
      {
        id: "11",
        title: "todoone",
        content: "todoone content",
      },
      {
        id: "12",
        title: "todotwo",
        content: "todotwo content",
      },
    ]);
    setDoTmp([
      {
        id: "21",
        title: "doone",
        content: "doone content",
      },
      {
        id: "22",
        title: "dotwo",
        content: "dotwo content",
      },
    ]);
    setDoneTmp([
      {
        id: "31",
        title: "doneone",
        content: "doneone content",
      },
      {
        id: "32",
        title: "donetwo",
        content: "donetwo content",
      },
    ]);
  }, []);
  return (
    <div className={styles.contentComponent}>
      <div
        className={styles.todo}
        ref={todoRef}
        onDragEnter={dragenter}
        onDragOver={(e) => dragover(e, "todo")}
        onDrop={(e) => drop(e, "todo")}
      >
        <h1>todo</h1>
        <div className={styles.items}>
          {todoTmp.length !== 0 ? (
            todoTmp.map((v) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                draggable
              >
                <input type="checkbox" id={v.id} />
                <label htmlFor={v.id}>{v.title}</label>
                <p>{v.content}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={styles.do}
        ref={doRef}
        onDragEnter={dragenter}
        onDragOver={(e) => dragover(e, "do")}
        onDrop={(e) => drop(e, "do")}
      >
        <h1>do</h1>
        <div className={styles.items}>
          {doTmp.length !== 0 ? (
            doTmp.map((v) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                draggable
              >
                <input type="checkbox" id={v.id} />
                <label htmlFor={v.id}>{v.title}</label>
                <p>{v.content}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={styles.done}
        ref={doneRef}
        onDragEnter={dragenter}
        onDragOver={(e) => dragover(e, "done")}
        onDrop={(e) => drop(e, "done")}
      >
        <h1>done</h1>
        <div className={styles.items}>
          {doneTmp.length !== 0 ? (
            doneTmp.map((v) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                draggable
              >
                <input type="checkbox" id={v.id} />
                <label htmlFor={v.id}>{v.title}</label>
                <p>{v.content}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalContent;
