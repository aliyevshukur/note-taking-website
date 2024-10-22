export const fetchNotes = async (filter) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/notes?filter=${filter}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
