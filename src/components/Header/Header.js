import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className={"header"}>
      <div className="header-left">
        <h1>NotesApp</h1>
        <button className="actual">Actual</button>
        <button className="archive">Archive</button>
      </div>
      <div className="header-right">
        <button className="create">Create</button>
      </div>
    </header>
  );
};

export default Header;
