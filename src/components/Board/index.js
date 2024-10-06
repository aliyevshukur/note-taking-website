import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useContext, useEffect, useState } from "react";
import { IsModifiedContext, NotesLocalContext } from "../../utils/Contexts";
import { customModifier } from "../../utils/customModifier";
import useWindowSize from "../../utils/Hooks/useWindowSize";
import { Droppable } from "../Droppable/Droppable";
import Note from "../Note/Note";
import "./style.scss";

const Board = ({ notes, setSingleNote }) => {
  const [notesLocal, setNotesLocal] = useContext(NotesLocalContext);
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

  // Copy notes to Local storage to modify them before updating to server
  useEffect(() => {
    setNotesLocal(notes);
  }, [notes, setNotesLocal]);

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width < 375) {
      setNoteSize({ width: "216px", height: "230px" });
    } else {
      setNoteSize({ width: "271px", height: "287px" });
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
    const draggingNote = notesLocal.find(
      (note) => note._id === event.active.id,
    );
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
    setDraggedNoteId(event.active.id);
    setIsModified(true);
  };

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
        {notesLocal?.length === 0 ? (
          <p className='no-notes'>No notes found</p>
        ) : (
          notesLocal?.map((note) => (
            <Note
              key={note._id}
              note={note}
              setSingleNote={setSingleNote}
              positionLocal={translate}
              draggedNoteId={draggedNoteId}
              style={{ height: noteSize.height, width: noteSize.width }}
              translate={translate}
              noteSize={noteSize}
            />
          ))
        )}
      </Droppable>
    </DndContext>
  );
};
export default Board;
