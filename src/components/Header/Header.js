import React from "react";
import "./Header.scss";

const Header = props => {
  const logoUrl =
    "https://lh3.googleusercontent.com/o4pIUj_igQB6-E3POw1aHoONrQ6tF9Uq7cfn6MzzSwNBFiwoK21i85mwWSU3zAlwiIw";

  return (
    <header className={"header"}>
      <div className="header-left">
        <div className="logo">
          <img src={logoUrl} alt="logo" />
          <h1 className={"header-title"}>NotesApp</h1>
        </div>
        <div className="header-left-buttons">
          <button className="button" onClick={props.filterActual}>
            Actual
          </button>
          <button className="button" onClick={props.filterArchive}>
            Archive
          </button>
        </div>
      </div>
      <div className="header-right">
        <button className="button">Create</button>
      </div>
    </header>
  );
};

export default Header;
