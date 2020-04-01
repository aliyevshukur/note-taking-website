import React from "react";
import "./Note.scss";

const Note = props => {
  const noteStyle = {
    backgroundColor: `${props.note.color}`,
    border: `1px solid ${props.note.color}`
  };

  const noteTitleStyle = {
    borderBottom: `1px solid ${props.note.color}`
  };

  return (
    <div style={noteStyle} className={"note"}>
      <h1 style={noteTitleStyle} className={"note-title"}>
        {props.note.title}
      </h1>
      <p className="context">{props.note.context}</p>
    </div>
  );
};

export default Note;
