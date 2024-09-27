import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

export function Draggable({ id, position, ...props }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    outline: "none",
    padding: "0px",
    border: "none",
    background: "transparent",
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
  };
  // console.log("Coordinates: ", position.x, position.y);

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
