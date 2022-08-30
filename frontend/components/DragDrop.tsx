import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGoal } from "../apis/goalapi";
import { RootState } from "../store";
// styles 따로 분류
import styles from "../styles/DragDrop.module.css";
import { dataType, itemType } from "../types/GoalType";

interface propsType {
  data: Array<itemType> | undefined;
  status: string;
  clicked: Function;
}
const DragDrop = (props: propsType) => {
  // 드래그로 변경될 내용들을 담아줄 객체
  // draggedFromIndex: 드래그 시작 인덱스, draggedToIndex: 변경될 드래그 인덱스
  // originalOrder 배열 목록
  // updatedOrder 새롭게 생성된 배열
  const [dragDrop, setDragDrop] = useState({
    draggedFromIndex: null,
    draggedToIndex: null,
    draggedFromStatus: null,
    draggedToStatus: null,
    isDragging: false,
    originalOrder: [],
    updateOrder: [],
  });

  const onDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.currentTarget.style.opacity = "0.4";
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {};
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {};
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {};
  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {};
  const onDragEnd = (e: React.DragEvent<HTMLLabelElement>) => {
    e.currentTarget.style.opacity = "1";
  };
  const onClicked = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    index: number,
    title: string,
    content: string
  ) => {
    // console.log(e, text);
    props.clicked(index, { title: title, content: content });
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.dragContainer}>
      {props.data?.map((value, index) => (
        <>
          <input
            type={"radio"}
            key={`DragItem-${index}`}
            id={`DragItem-${index}`}
            name={`dragItem-${props.status}`}
            onClick={(e) => {
              onClicked(e, index, value.title, value.content);
            }}
          ></input>
          <label
            htmlFor={`DragItem-${index}`}
            className={styles.item}
            draggable
            data-position={index}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
          >
            {value.title}
          </label>
          {/* <p>{value.content}</p> */}
        </>
      ))}
    </div>
  );
};

export default DragDrop;
