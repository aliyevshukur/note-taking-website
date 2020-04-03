import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header className={"header"}>


        <Link to={'/'} className="note-logo">
          <img src={require("../../img/SiteLogo.png")} alt="logo" />
          <h1 className={"header-title"}>
            Notes<span className={"header-title-part"}>App</span>
          </h1>
        </Link>

        <div className="header-buttons">

          <Link to={"/"} className="button" onClick={props.filterActual}>
            Actual
          </Link>

          <Link to={"/"} className="button" onClick={props.filterArchive}>
            Archive
          </Link>

          <Link
              to={"/create-edit"}
              className="button"
              onClick={props.createHandler}>
            Create
          </Link>

        </div>

    </header>
  );
};

export default Header;
