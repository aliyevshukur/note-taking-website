import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useMemo } from "react";

export function Draggable({ id, position, draggedNoteId, ...props }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  let zIndex = 0;
  if (draggedNoteId === id) {
    zIndex = 100;
  }
  console.log(`INDEX ${zIndex}`);
  const style = {
    transform: CSS.Translate.toString(transform),
    outline: "none",
    padding: "0px",
    border: "none",
    background: "transparent",
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: zIndex,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
