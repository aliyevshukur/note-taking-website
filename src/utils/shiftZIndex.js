export const shiftZIndex = (id, notes) => {
  const note = notes.find((note) => note._id === id);
  const newIndex = notes.length - 1;
  const currentIndex = notes.findIndex((note) => note._id === id);

  notes.splice(currentIndex, 1); // Remove the dragged note from the array
  notes.splice(newIndex, 0, note); // Insert the dragged note at the end of the array

  notes.forEach((note, index) => {
    note.zIndex = index;
  });

  return notes;
};
