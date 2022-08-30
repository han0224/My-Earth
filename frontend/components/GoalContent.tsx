import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveGoal } from "../apis/goalapi";
import useAddItem from "../hooks/useAddItem";
import { RootState } from "../store";
import { updateFinal, updateWeek, updateYear, updatMonth } from "../store/goal";
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
  const [detail, setDetail] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [modify, setModify] = useState(false);
  const text = useAddItem("");

  const save = async () => {
    const result = await saveGoal(goalStatus[status], email, props.goal);
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
      if (status === "week") {
        dispatch(updateWeek([...goalStatus.week, item]));
      } else if (status === "month") {
        dispatch(updatMonth([...goalStatus.month, item]));
      } else if (status === "year") {
        dispatch(updateYear([...goalStatus.year, item]));
      } else if (status === "final") {
        dispatch(updateFinal([...goalStatus.final, item]));
      } else return;
      save();
    }
  };

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("click");
    if (textareaRef.current) {
      if (modify) {
        textareaRef.current.disabled = true;
        updateItem();
      } else {
        textareaRef.current.disabled = false;
      }
    }
    setModify(!modify);
  };

  const checked = (index: number, item: itemType) => {
    setDetail(item.content);
    setUpdate({ index: index, title: item.title, content: item.content });
  };

  const updateItem = () => {
    let before;
    if (status === "week") {
      before = goalStatus.week;
    } else if (status === "month") {
      before = goalStatus.month;
    } else if (status === "year") {
      before = goalStatus.year;
    } else if (status === "final") {
      before = goalStatus.final;
    } else return;
    before[update.index].title = update.title;
    before[update.index].content = detail;
    save();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value }: any = { ...e.target };
    setDetail(value);
  };

  useEffect(() => {
    setStauts(props.goal);
    setDetail("");
  }, [props]);

  return (
    <div className={styles.contentComponent}>
      <div className={styles.item}>
        <DragDrop data={goalStatus[status]} status={status} clicked={checked} />
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
      {/* <button onClick={save}>save</button> */}
    </div>
  );
};

export default GoalContent;
