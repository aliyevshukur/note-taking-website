import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = props => {
  const logoUrl =
    "https://lh3.googleusercontent.com/o4pIUj_igQB6-E3POw1aHoONrQ6tF9Uq7cfn6MzzSwNBFiwoK21i85mwWSU3zAlwiIw";

  return (
    <header className={"header"}>
      <div className="header-left">
        <div className="logo">
          <img src={logoUrl} alt="logo" />
          <Link to={"/"} className={"header-title"}>
            NotesApp
          </Link>
        </div>
        <div className="header-left-buttons">
          <Link to={"/"} className="button" onClick={props.filterActual}>
            Actual
          </Link>
          <Link to={"/"} className="button" onClick={props.filterArchive}>
            Archive
          </Link>
        </div>
      </div>
      <div className="header-right">
        <Link
          to={"/create-edit"}
          className="button"
          onClick={props.createHandler}
        >
          Create
        </Link>
      </div>
    </header>
  );
};

export default Header;
