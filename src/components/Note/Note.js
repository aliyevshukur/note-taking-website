import React from "react";
import { useHistory } from "react-router-dom";
import { Draggable } from "../Draggable/Draggable";
import "./Note.scss";

const Note = ({ note, setSingleNote, draggedNoteId }) => {
  const truncated = (context, maxLength) => {
    return maxLength > context.length
      ? context
      : context.substr(0, maxLength) + "...";
  };
  const history = useHistory();

  const noteStyle = {
    backgroundColor: `${note.color}`,
    opacity: `${note.isArchived && "40%"}`,
  };
  const handleOnClick = () => {
    setSingleNote(note);
    history.push(`/notes/${note._id}`);
  };

  return (
    <Draggable
      id={note._id}
      position={note.position}
      draggedNoteId={draggedNoteId}
    >
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
