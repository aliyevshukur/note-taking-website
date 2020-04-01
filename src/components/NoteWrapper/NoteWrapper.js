import React from "react";
import Note from "../Note/Note";
import "./NoteWrapper.scss";

const NoteWrapper = props => {
  return (
    <div className={"note-wrapper"}>
      {props.notes.map(n => (
        <Note key={n.id} note={n} />
      ))}
    </div>
  );
};

export default NoteWrapper;
