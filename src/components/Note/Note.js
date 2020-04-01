import React from "react";

const Note = props => {
  return (
    <div className={"note"}>
      <h1 className={"note-title"}>{props.note.title}</h1>
      <p className="context">{props.note.context}</p>
    </div>
  );
};

export default Note;
