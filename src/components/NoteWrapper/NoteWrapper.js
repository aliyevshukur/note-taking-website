import React from "react";
import Note from "../Note/Note";
import "./NoteWrapper.scss";

const NoteWrapper = (props) => {
  console.log(`PROPS: ${props.notes}`);
  return (
    <div className={"note-wrapper"}>
      {props.notes.length === 0 ? (
        <p className='no-notes'>No notes found</p>
      ) : (
        props.notes.map((note) => (
          <Note
            key={note._id}
            note={note}
            setSingleNote={props.setSingleNote}
            createBorderColor={props.createBorderColor}
          />
        ))
      )}
    </div>
  );
};
export default NoteWrapper;
