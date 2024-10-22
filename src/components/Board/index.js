import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useContext, useEffect, useState } from "react";
import GrabSound from "../../assets/grab.MP3";
import PutSound from "../../assets/put.MP3";
import { IsModifiedContext, NotesContext } from "../../utils/Contexts";
import { customModifier } from "../../utils/customModifier";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import { shiftZIndex } from "../../utils/shiftZIndex";
import { Droppable } from "../Droppable/Droppable";
import Note from "../Note/Note";
import "./style.scss";

const Board = ({ setSingleNote, loading, filter }) => {
  const [notes, setNotes] = useContext(NotesContext);
  const [noteSize, setNoteSize] = useState({ width: "271px", height: "287px" });
  const [draggedNoteId, setDraggedNoteId] = useState(null);
  const [isModified, setIsModified] = useContext(IsModifiedContext);
  const defaultCoordinates = { x: 0, y: 0 };
  const [{ translate }, setTranslate] = useState({
    initialTranslate: defaultCoordinates,
    translate: defaultCoordinates,
  });

  // SENSORS
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  //Change note size depending on windows width
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width < 375) {
      setNoteSize({ width: "216px", height: "230px" });
    } else if (windowSize.width < 1920) {
      setNoteSize({ width: "271px", height: "287px" });
    } else if (windowSize.width < 2560) {
      setNoteSize({ width: "352px", height: "369px" });
    }
  }, [windowSize]);

  // DRAG EVENT HANDLERS
  const onDragMove = ({ delta }) => {
    setTranslate(({ initialTranslate }) => {
      return {
        initialTranslate,
        translate: {
          x: initialTranslate.x + delta.x,
          y: initialTranslate.y + delta.y,
        },
      };
    });
  };
  const onDragEnd = (event) => {
    playPutSound();
    setDraggedNoteId(null);
    const draggingNote = notes.find((note) => note._id === event.active.id);
    draggingNote.position.x += event.delta.x;
    draggingNote.position.y += event.delta.y;

    setTranslate(({ translate }) => {
      return {
        translate,
        initialTranslate: translate,
      };
    });
  };
  const onDragCancel = () => {
    setTranslate(({ initialTranslate }) => ({
      translate: initialTranslate,
      initialTranslate,
    }));
  };
  const onDragStart = (event) => {
    playGrabSound();
    setDraggedNoteId(event.active.id);
    setIsModified(true);

    const shiftedNotes = shiftZIndex(event.active.id, notes);
    localStorage.setItem("notes", JSON.stringify(shiftedNotes));
    setNotes(shiftedNotes);
  };

  const playGrabSound = () => {
    const grabSound = new Audio(GrabSound);
    grabSound.play();
  };

  const playPutSound = () => {
    const putSound = new Audio(PutSound);
    putSound.play();
  };

  if (loading) {
    return (
      <div className='board'>
        <div className='loader' />
      </div>
    );
  }

  return (
    <DndContext
      modifiers={[customModifier]}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <Droppable className={"board"}>
        {notes?.length === 0 ? (
          <p className='no-notes'>No notes found</p>
        ) : (
          notes?.map((note, index) => {
            if (filter === "actual") if (note.isArchived) return null;
            if (filter === "archived") if (!note.isArchived) return null;

            return (
              <Note
                key={note._id}
                note={note}
                setSingleNote={setSingleNote}
                positionLocal={translate}
                draggedNoteId={draggedNoteId}
                style={{ height: noteSize.height, width: noteSize.width }}
                translate={translate}
                noteSize={noteSize}
                index={index}
              />
            );
          })
        )}
      </Droppable>
    </DndContext>
  );
};
export default Board;
