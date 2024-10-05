import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import { truncated } from "../../utils/truncates";
import { Draggable } from "../Draggable/Draggable";
import "./Note.scss";

const Note = ({
  note,
  setSingleNote,
  draggedNoteId,
  style,
  translate,
  noteSize,
}) => {
  const history = useHistory();
  const noteStyle = {
    backgroundColor: `${note.color}`,
    opacity: `${note.isArchived && "40%"}`,
    ...style,
  };
  /**
   * Handles note click event.
   * Sets selected note to context and redirects to single note page.
   */
  const handleOnClick = () => {
    setSingleNote(note);
    history.push(`/notes/${note._id}`);
  };

  const windowSize = useWindowSize();

  useEffect(() => {
    const topBorder = 100;
    const bottomBorder = windowSize.height - 150;
    const leftBorder = 100;
    const rightBorder = windowSize.width - 80;
    const x = note.position.x;
    const y = note.position.y;
    const noteWidth = Number(noteSize.width.slice(0, -2));
    const noteHeight = Number(noteSize.height.slice(0, -2));

    if (x + noteWidth >= rightBorder) {
      note.position.x = rightBorder - noteWidth;
    } else if (x <= leftBorder) {
      note.position.x = leftBorder;
    } else if (y + noteHeight >= bottomBorder) {
      note.position.y = bottomBorder - noteHeight;
    } else if (y <= topBorder) {
      note.position.y = topBorder;
    }
  }, [windowSize]);

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
