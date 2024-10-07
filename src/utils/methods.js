export function findBiggestzIndex(notes) {
  let biggestzIndex = 0;
  notes.forEach((note) => {
    if (note.zIndex > biggestzIndex) {
      biggestzIndex = note.zIndex;
    }
  });

  return biggestzIndex;
}
