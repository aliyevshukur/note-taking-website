export async function updateNotes(notes) {
  console.log(JSON.stringify(notes));
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/notes`, {
      method: "PUT",
      body: JSON.stringify(notes),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
