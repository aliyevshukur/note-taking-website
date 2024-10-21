export const shiftZIndex = (id, notes, filter) => {
  let draggedZIndex = null;

  const notesToShift = notes.map((note) => {
    if (note._id === id) {
      draggedZIndex = note.zIndex;
    }

    return note;
  });

  const notesTemp = notesToShift.map((note) => {
    if (filter === "actual") if (note.isArchived) return note;
    if (filter === "archived") if (!note.isArchived) return note;

    if (note._id === id) note.zIndex = notes.length - 1;
    else if (note.zIndex > draggedZIndex) note.zIndex -= 1;

    return note;
  });

  return notesTemp;
};
