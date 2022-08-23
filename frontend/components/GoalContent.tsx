import React, { useEffect, useRef, useState } from "react";
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
  const [newIndex, setNewIndex] = useState(-1);
  const [status, setStatus] = useState("");

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

  const dragenter = (
    e: React.DragEvent<HTMLElement>,
    index: number,
    status: string
  ) => {
    e.preventDefault();
    setNewIndex(index);
    setStatus(status);
    // y위치를 토대로 위쪽, 아래쪽 확인 필요
    const { target } = e;

    console.log("dragenter, ", index);
    // 겹쳐진 요소의 인덱스 찾기
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

    const flag = changeItem(index, before);
    if (flag === null) console.log("error");
  };

  const changeItem = (index: number, beforeType: string) => {
    // [o] 현재 status에서 item을 가져오기
    // [ ] status newIndex자리에 item추가
    // [ ] 현재 item을 삭제 -> item 뒤의 값들을 앞으로 한칸씩 옮김

    const statusTmp = [
      {
        type: "todo",
        item: todoTmp[index],
        tmp: [...todoTmp],
        setStatus: (arr: Array<itemType>) => setTodoTmp(arr),
      },
      {
        type: "do",
        item: doTmp[index],
        tmp: [...doTmp],
        setStatus: (arr: Array<itemType>) => setDoTmp(arr),
      },
      {
        type: "done",
        item: doneTmp[index],
        tmp: [...doneTmp],
        setStatus: (arr: Array<itemType>) => setDoneTmp(arr),
      },
    ];

    const beforeUpdateStatus = statusTmp.find((v) => v.type === beforeType);
    const afterUpdateStatus = statusTmp.find((v) => v.type === status);

    if (!beforeUpdateStatus || !afterUpdateStatus) return null;

    const beforeUpdateItem = beforeUpdateStatus.item;
    const beforeUpdateStatusArray = beforeUpdateStatus.setStatus;
    const beforeUpdateStatusData = beforeUpdateStatus.tmp;

    const afterUpdateStatusArray = afterUpdateStatus.setStatus;
    const afterUpdateStatusData = afterUpdateStatus.tmp;

    if (beforeType === status) {
      [afterUpdateStatusData[index], afterUpdateStatusData[newIndex]] = [
        afterUpdateStatusData[newIndex],
        afterUpdateStatusData[index],
      ];
      afterUpdateStatusArray(afterUpdateStatusData);
    } else {
      // item 추가
      afterUpdateStatusData.splice(newIndex, 0, beforeUpdateItem);
      afterUpdateStatusArray(afterUpdateStatusData);

      // itme 삭제
      beforeUpdateStatusArray(
        beforeUpdateStatusData.filter((v) => v !== beforeUpdateItem)
      );
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
      {
        id: "13",
        title: "todo3",
        content: "todo3 content",
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
        onDragOver={(e) => dragover(e, "todo")}
        onDrop={(e) => drop(e, "todo")}
      >
        <h1>todo</h1>
        <div className={styles.items}>
          {todoTmp.length !== 0 ? (
            todoTmp.map((v, i) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                onDragEnter={(e) => dragenter(e, i, "todo")}
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
        onDragOver={(e) => dragover(e, "do")}
        onDrop={(e) => drop(e, "do")}
      >
        <h1>do</h1>
        <div className={styles.items}>
          {doTmp.length !== 0 ? (
            doTmp.map((v, i) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                onDragEnter={(e) => dragenter(e, i, "do")}
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
        onDragOver={(e) => dragover(e, "done")}
        onDrop={(e) => drop(e, "done")}
      >
        <h1>done</h1>
        <div className={styles.items}>
          {doneTmp.length !== 0 ? (
            doneTmp.map((v, i) => (
              <div
                key={v.id}
                className={styles.item}
                onDragStart={dragStart}
                onDragEnter={(e) => dragenter(e, i, "done")}
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
