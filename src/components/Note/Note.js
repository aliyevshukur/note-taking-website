import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Draggable } from "../Draggable/Draggable";
import { Droppable } from "../Droppable/Droppable";
import "./Note.scss";

const Note = ({ position, positionLocal, note, ...props }) => {
  const truncated = (context, maxLength) => {
    return maxLength > context.length
      ? context
      : context.substr(0, maxLength) + "...";
  };
  const history = useHistory();
  const [isDragging, setIsDragging] = useState(false);

  const noteStyle = {
    backgroundColor: `${note.color}`,
    opacity: `${note.isArchived && "40%"}`,
    cursor: `${isDragging ? "grabbing" : "pointer"}`,
  };
  console.log(`NOTE ${JSON.stringify(note)}`);
  const handleOnClick = () => {
    if (!isDragging) {
      // props.setSingleNote(props.note);
      // history.push(`/notes/${props.note._id}`);
    }
  };

  return (
    <Draggable id={note._id} isDragging={isDragging} position={note.position}>
      <div style={noteStyle} className={"note"}>
        <h1 className={"note-title"}>{note.title}</h1>
        <p className='context' onClick={() => handleOnClick()}>
          {truncated(note.context, 200)}
        </p>
      </div>
    </Draggable>
  );
};

export default Note;
