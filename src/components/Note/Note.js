import React from "react";
import "./Note.scss";
import { Link } from "react-router-dom";

const Note = props => {

  const createBorderColor = (color) => {
    let secondColor = color.slice(4, 15);
    let arr = secondColor.split(',');
    arr = arr.map(el => parseInt(el) - 70);
    secondColor = `rgb(${arr[0]},${arr[1]},${arr[2]})`;
    return secondColor;
  };

  const noteStyle = {
    backgroundColor: `${props.note.color}`,
    border: `1px solid ${createBorderColor(props.note.color)}`
  };

  const noteTitleStyle = {
    borderBottom: `1px solid ${createBorderColor(props.note.color)}`
  };

  return (
    <Link
      to={`/notes/${props.note.id}`}
      onClick={() => props.setSingleNote(props.note)}
      style={noteStyle}
      className={"note"}
    >
      <img src={require("../../img/pin_PNG100.png")} alt={"pin_img"} height={"47px"} width={"50px"} style={{"margin":"0px auto"}}/>
      <h1 style={noteTitleStyle} className={"note-title"}>
        {props.note.title}
      </h1>
      <p className="context">{props.note.context}</p>
    </Link>
  );
};

export default Note;
