export function updateNotes() {
  const notesRaw = JSON.parse(localStorage.getItem("notes")) || [];
  const noteToPost = notesRaw.map((note) => {
    return {
      title: note.title,
      context: note.context,
      color: note.color,
      isArchived: note.isArchived,
      position: note.position,
    };
  });
  console.log(JSON.stringify(notesRaw));
  //   fetch("https://note-taking-website-server.vercel.app/notes", {
  //     method: "PUT",
  //     body: notesRaw,
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Notes updated: ", result);
  //     });
}
