import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getGoal } from "../apis/goalapi";
import { RootState } from "../store";
import styles from "../styles/DragDrop.module.css";
import { dataType, itemType } from "../types/GoalType";
import { AiOutlineDelete } from "react-icons/ai";

interface propsType {
  data: Array<itemType> | undefined;
  status: string;
  clicked: Function;
  deleteItem: Function;
  updateList: Function;
}
const DragDrop = (props: propsType) => {
  // 드래그로 변경될 내용들을 담아줄 객체
  // draggedFromIndex: 드래그 시작 인덱스, draggedToIndex: 변경될 드래그 인덱스
  // originalOrder 배열 목록
  // updatedOrder 새롭게 생성된 배열
  const [dragDrop, setDragDrop] = useState({
    draggedFromIndex: -1,
    draggedToIndex: -1,
    isDragging: false,
    originalOrder: [{ title: "", content: "" }],
    updateOrder: [{ title: "", content: "" }],
  });

  const onDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.currentTarget.style.opacity = "0.4";
    // 시작했을 때의 배열의 인덱스
    const initialPosition = parseInt(e.currentTarget.dataset.position ?? "-1");
    setDragDrop({
      ...dragDrop,
      draggedFromIndex: initialPosition,
      originalOrder: props.data ?? dragDrop.originalOrder,
    });
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    // item 들이 겹쳤을 때
    e.preventDefault();
    let newList = dragDrop.originalOrder;
    const draggedFromIndex = dragDrop.draggedFromIndex;
    const draggedToIndex = parseInt(e.currentTarget.dataset.position ?? "-1");
    const itemDragged = newList[draggedFromIndex];
    const remainingITems = newList.filter(
      (item, index) => index !== draggedFromIndex
    );

    newList = [
      ...remainingITems.slice(0, draggedToIndex),
      itemDragged,
      ...remainingITems.slice(draggedToIndex),
    ];
    if (draggedToIndex !== dragDrop.draggedToIndex) {
      setDragDrop({
        ...dragDrop,
        updateOrder: newList,
        draggedToIndex: draggedToIndex,
      });
    }
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    setDragDrop({
      ...dragDrop,
      draggedToIndex: -1,
    });
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    props.updateList(dragDrop.updateOrder);
    setDragDrop({
      ...dragDrop,
      draggedFromIndex: -1,
      draggedToIndex: -1,
    });
  };
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
            <AiOutlineDelete onClick={(e) => props.deleteItem(e, index)} />
          </label>
          {/* <p>{value.content}</p> */}
        </>
      ))}
    </div>
  );
};

export default DragDrop;
