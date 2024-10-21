import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import "./style.scss";

export function Draggable({ id, position, draggedNoteId, zIndex, ...props }) {
  const windowSize = useWindowSize();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    disabled: windowSize.width < 425,
  });

  let draggableStyle = {};
  if (windowSize.width > 425) {
    draggableStyle = {
      left: `${position.x}px`,
      top: `${position.y}px`,
      zIndex: zIndex,
      touchAction: "none",
      transform: CSS.Translate.toString(transform),
    };
  }
  const style = {
    background: "transparent",
    outline: "none",
    padding: "0px",
    border: "none",
  };

  return (
    <button
      ref={setNodeRef}
      style={{ ...style, ...draggableStyle }}
      {...listeners}
      {...attributes}
      className='draggable'
    >
      {props.children}
    </button>
  );
}
