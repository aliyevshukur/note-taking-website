import React from "react";

const Header = () => {
  return (
    <header className={"header"}>
      <h1>NotesApp</h1>
      <button className="actual">Actual</button>
      <button className="archive">Archive</button>
      <button className="create">Create</button>
    </header>
  );
};

export default Header;
