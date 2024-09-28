import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React, { useContext, useEffect, useState } from "react";
import { IsModifiedContext, NotesLocalContext } from "../../utils/Contexts";
import { Droppable } from "../Droppable/Droppable";
import Note from "../Note/Note";
import "./NoteWrapper.scss";

const NoteWrapper = ({ notes, setSingleNote }) => {
  const [notesLocal, setNotesLocal] = useContext(NotesLocalContext);
  const [isModified, setIsModified] = useContext(IsModifiedContext);
  const defaultCoordinates = {
    x: 0,
    y: 0,
  };
  const [{ translate }, setTranslate] = useState({
    initialTranslate: defaultCoordinates,
    translate: defaultCoordinates,
  });
  const [draggedNoteId, setDraggedNoteId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  useEffect(() => {
    setNotesLocal(notes);
  }, [notes]);

  const onDragMove = ({ delta }) => {
    setTranslate(({ initialTranslate }) => ({
      initialTranslate,
      translate: {
        x: initialTranslate.x + delta.x,
        y: initialTranslate.y + delta.y,
      },
    }));
  };
  const onDragEnd = (event) => {
    const draggingNote = notesLocal.find((x) => x._id === event.active.id);
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
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <Droppable className={"note-wrapper"}>
        {notesLocal.length === 0 ? (
          <p className='no-notes'>No notes found</p>
        ) : (
          notesLocal.map((note) => (
            <Note
              key={note._id}
              note={note}
              setSingleNote={setSingleNote}
              positionLocal={translate}
              draggedNoteId={draggedNoteId}
            />
          ))
        )}
      </Droppable>
    </DndContext>
  );
};
export default NoteWrapper;
