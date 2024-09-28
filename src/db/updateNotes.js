export function updateNotes(notes) {
  console.log(JSON.stringify(notes));
  fetch("https://note-taking-website-server.vercel.app/notes", {
    method: "PUT",
    body: JSON.stringify(notes),
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Notes updated: ", result);
    });
}
