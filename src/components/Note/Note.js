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
  noteSize,
  index,
}) => {
  const history = useHistory();
  const { zIndex = index } = note;

  const noteStyle = {
    backgroundColor: `${note.color}`,
    opacity: `${note.isArchived && "40%"}`,
    zIndex: zIndex,
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
  // console.log(`Note ${JSON.stringify(note)}`);
  const windowSize = useWindowSize();

  // Clamp note position to window size on window resize
  useEffect(() => {
    function clampNoteToBoundary() {
      // NOTE: borderOffset value must match with border size of Board component
      let borderOffset = 80;

      switch (true) {
        case windowSize.width < 375:
          borderOffset = 30;
          break;
        case windowSize.width < 1440:
          borderOffset = 40;
          break;
        case windowSize.width < 1920:
          borderOffset = 40;
          break;
        case windowSize.width < 2560:
          borderOffset = 60;
          break;
        default:
          borderOffset = 80;
      }

      const topBorder = 0;
      const bottomBorder =
        windowSize.height - borderOffset * 2 - windowSize.height * 0.1;
      const leftBorder = 0;
      const rightBorder = windowSize.width - borderOffset * 2;
      const x = note.position.x;
      const y = note.position.y;
      const noteWidth = Number(noteSize.width.slice(0, -2));
      const noteHeight = Number(noteSize.height.slice(0, -2));

      if (x + noteWidth >= rightBorder) {
        note.position.x = rightBorder - noteWidth;
      } else if (x <= leftBorder) {
        note.position.x = leftBorder;
      }

      if (y + noteHeight >= bottomBorder) {
        note.position.y = bottomBorder - noteHeight;
      } else if (y <= topBorder) {
        note.position.y = topBorder;
      }
    }

    clampNoteToBoundary();
  }, [windowSize, note.position, noteSize.height, noteSize.width]);

  if (note._id === draggedNoteId) {
    // console.log("zIndex: ", zIndex);
    noteStyle.boxShadow = "12px 12px 0px 0 rgba(51, 50, 46, 0.9)";
    noteStyle.cursor = "grab";
    noteStyle.transform = "scale(1.04)";
  }

  return (
    <Draggable
      id={note._id}
      position={note.position}
      draggedNoteId={draggedNoteId}
      zIndex={note.zIndex}
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
