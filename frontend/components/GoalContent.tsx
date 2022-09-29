import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveGoal } from "../apis/goalapi";
import useAddItem from "../hooks/useAddItem";
import { RootState } from "../store";
import {
  updateFinal,
  updateWeek,
  updateYear,
  updateMonth,
} from "../store/goal";
import styles from "../styles/GoalContent.module.css";
import { dataType, itemType } from "../types/GoalType";
import DragDrop from "./DragDrop";

interface Props {
  goal: string;
}

const GoalContent = (props: Props) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state: RootState) => state.user);
  const goalStatus = useSelector((state: RootState) => state.goal);

  const [status, setStauts] = useState("week");
  const [update, setUpdate] = useState({
    index: 0,
    title: "",
    content: "",
  });
  const initData = goalStatus;
  const [detail, setDetail] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [modify, setModify] = useState(false);
  const text = useAddItem("");

  const statusType = [
    {
      status: "week",
      setUpdate: (item: itemType[]) => dispatch(updateWeek(item)),
    },
    {
      status: "month",
      setUpdate: (item: itemType[]) => dispatch(updateMonth(item)),
    },
    {
      status: "year",
      setUpdate: (item: itemType[]) => dispatch(updateYear(item)),
    },
    {
      status: "final",
      setUpdate: (item: itemType[]) => dispatch(updateFinal(item)),
    },
  ];

  const save = async () => {
    console.log(initData[status], goalStatus[status]);
    // if (initData[status] === goalStatus[status]) return;
    const result = await saveGoal(goalStatus[status], email, status);
    if (!result.success) {
      console.log("error");
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      const item = {
        title: text.value,
        content: "",
      };
      text.setValue("");
      const index = statusType.findIndex((v) => v.status === status);
      if (index === -1) return;
      // let before = statusType[index].getGoal();
      const before = goalStatus[status];
      statusType[index].setUpdate([...before, item]);
    }
  };

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (textareaRef.current) {
      if (modify) {
        textareaRef.current.disabled = true;
        updateItem();
      } else {
        textareaRef.current.disabled = false;
        textareaRef.current.focus();
        console.log(
          textareaRef.current.value,
          textareaRef.current.value.length
        );
        textareaRef.current.setSelectionRange(
          0,
          textareaRef.current.value.length
        );
      }
    }
    setModify(!modify);
  };

  const checked = (index: number, item: itemType) => {
    setDetail(item.content);
    setUpdate({ index: index, title: item.title, content: item.content });
  };

  const updateItem = () => {
    const index = statusType.findIndex((v) => v.status === status);
    if (index === -1) return;
    // let before = statusType[index].getGoal();
    const before = goalStatus[status];

    before[update.index].title = update.title;
    before[update.index].content = detail;
    updateList(before);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value }: any = { ...e.target };
    setDetail(value);
  };

  const deleteItem = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    index: number
  ) => {
    const updateArray = [
      ...goalStatus[status].slice(0, index),
      ...goalStatus[status].slice(index + 1),
    ];
    updateList(updateArray);
  };

  const updateList = (updateOrder: Array<itemType>) => {
    const type = statusType.findIndex((v) => v.status === status);
    if (type === -1) return;
    statusType[type].setUpdate(updateOrder);
  };
  useEffect(() => {
    setStauts(props.goal);
    setDetail("");
  }, [props]);

  useEffect(() => {
    console.log("!!!");
    save();
  }, [goalStatus]);

  return (
    <div className={styles.contentComponent}>
      <div className={styles.item}>
        <DragDrop
          data={goalStatus[status]}
          status={status}
          clicked={checked}
          deleteItem={deleteItem}
          updateList={updateList}
        />
        <input
          type={"text"}
          placeholder={"+ add"}
          {...text}
          onKeyDown={onKeyDown}
        ></input>
      </div>
      <div className={styles.detail}>
        <textarea
          value={detail}
          onChange={onChange}
          ref={textareaRef}
          disabled
        ></textarea>
        <button onClick={onClickButton}>modify</button>
      </div>
    </div>
  );
};

export default GoalContent;
