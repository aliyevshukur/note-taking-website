import React from "react";
import "./Note.scss";
import { Link } from "react-router-dom";
import pinImage from "../../img/pin_PNG100.png";

const Note = props => {



  // Truncate text length to maxLength
  const truncated = (context, maxLength) => {
    return maxLength > context.length ? context : context.substr(0, maxLength) + '...';
  };

  const noteStyle = {
    backgroundColor: `${props.note.color}`,
    border: `2px solid ${props.createBorderColor(props.note.color)}`
  };

  const noteTitleStyle = {
    borderBottom: `2px solid ${props.createBorderColor(props.note.color)}`
  };

  return (
    <Link
      to={`/notes/${props.note.id}`}
      onClick={() => props.setSingleNote(props.note)}
      style={noteStyle}
      className={"note"}
    >
      <img src={pinImage} alt={"pin_img"} height={"47px"} width={"50px"} style={{"margin":"0px auto"}}/>
      <h1 style={noteTitleStyle} className={"note-title"}>
        {props.note.title}
      </h1>
      <p className="context">{truncated(props.note.context, 200)}</p>
    </Link>
  );
};

export default Note;
