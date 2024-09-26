import React from "react";
import { Link } from "react-router-dom";
import pinImage from "../../img/pin_PNG100.png";
import "./Note.scss";

const Note = (props) => {
  // Truncate text length to maxLength
  const truncated = (context, maxLength) => {
    return maxLength > context.length
      ? context
      : context.substr(0, maxLength) + "...";
  };

  const noteStyle = {
    backgroundColor: `${props.note.color}`,
    opacity: ` ${props.note.isArchived && "40%"}`,
  };

  return (
    <Link
      to={`/notes/${props.note._id}`}
      onClick={() => props.setSingleNote(props.note)}
      style={noteStyle}
      className={"note"}
    >
      {/* <img src={pinImage} alt={"pin_img"} className={"note-pin-img"} /> */}
      <h1 className={"note-title"}>{props.note.title}</h1>
      <p className='context'>{truncated(props.note.context, 200)}</p>
    </Link>
  );
};

export default Note;
