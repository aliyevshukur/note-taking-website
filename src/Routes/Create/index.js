import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  aqua,
  aquaLight,
  peach,
  peachLight,
  yellow,
  yellowLight,
} from "../../utils/colors";
import "./style.scss";

const CreateEdit = (props) => {
  const history = useHistory();
  let defaultNote;

  if (props.action === "edit") {
    defaultNote = props.selectedNote;
  } else {
    defaultNote = {
      title: "",
      context: "",
      status: false,
      color: "",
      position: { x: 0, y: 0 },
    };
  }

  const [currentNote, setCurrentNote] = useState(defaultNote);
  const [selectedColor, setSelectedColor] = useState(defaultNote.color);
  const [btnDisabled, setBtnDisabled] = useState(true);

  //save input values
  const onFormChange = (e) => {
    const note = { ...currentNote };

    note[e.target.name] = e.target.value;

    setCurrentNote(note);
  };

  useEffect(() => {
    if (currentNote.title && currentNote.context && selectedColor) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [currentNote, selectedColor]);

  //Set note color
  const setColor = (color) => {
    const note = { ...currentNote };

    note.color = color;

    setCurrentNote(note);
    setSelectedColor(color);
  };

  //Return border color if button is active
  const isActive = (name) => {
    return name === selectedColor
      ? { border: "4px solid #0A84FF", margin: "6px" }
      : {};
  };

  //Trigger parents form handler and redirect to home page
  const formSubmitHandler = (e) => {
    props.onFormSubmit(e, currentNote);
    history.goBack();
  };

  return (
    <div className='form-wrapper'>
      <form
        className={"create-edit-form"}
        onSubmit={formSubmitHandler}
        onChange={onFormChange}
      >
        <h1 className={"form-title"}>Fill data</h1>

        <input
          name='title'
          type='text'
          defaultValue={currentNote.title}
          className={"title"}
        />

        <textarea
          name='context'
          id='1'
          cols='30'
          rows='10'
          defaultValue={currentNote.context}
          className={"context"}
        />

        <div className='color-buttons'>
          <p>Color:</p>

          <div
            className={"button-peach"}
            style={isActive(peach)}
            onClick={() => setColor(peach)}
          ></div>

          <div
            className={"button-aqua"}
            style={isActive(aqua)}
            onClick={() => setColor(aqua)}
          ></div>

          <div
            className={"button-yellow"}
            style={isActive(yellow)}
            onClick={() => setColor(yellow)}
          ></div>
        </div>

        <input
          disabled={btnDisabled}
          type='submit'
          value={props.action === "edit" ? "SAVE" : "CREATE"}
          className={"create-edit-button"}
        />
      </form>
    </div>
  );
};
export default CreateEdit;
