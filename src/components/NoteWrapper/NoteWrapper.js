import { DndContext, closestCorners, useDraggable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React, { useContext, useEffect, useState } from "react";
import { NotesLocalContext } from "../../utils/Contexts";
import { Droppable } from "../Droppable/Droppable";
import Note from "../Note/Note";
import "./NoteWrapper.scss";

const NoteWrapper = ({ notes, setSingleNote }) => {
  const [notesLocal, setNotesLocal] = useContext(NotesLocalContext);
  const defaultCoordinates = {
    x: 0,
    y: 0,
  };
  const [{ translate }, setTranslate] = useState({
    initialTranslate: defaultCoordinates,
    translate: defaultCoordinates,
  });
  const [draggedNoteId, setDraggedNoteId] = useState(null);

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
  console.log(`NOTES LOCAL: ${JSON.stringify(notesLocal)}`);
  const onDragEnd = (event) => {
    const draggingNote = notesLocal.find((x) => x._id === event.active.id);
    draggingNote.position.x += event.delta.x;
    draggingNote.position.y += event.delta.y;
    // setNotesLocal((notesLocal) => {
    //   const notesLocalTemp = notesLocal.map((x) => {
    //     if (x.id === draggingNote.id) return draggingNote;
    //     return x;
    //   });
    //   return notesLocalTemp;
    // });

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
  };

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
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
