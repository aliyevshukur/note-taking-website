import React from "react";
import { Link } from "react-router-dom";
import noteImage from "../../img/SiteLogo.png";
import "./Header.scss";

const Header = (props) => {
  return (
    <header className={"header"}>
      <Link to={"/"} className='note-logo'>
        <img src={noteImage} alt='logo' />
        <h1 className={"header-title"}>
          Noted!<span className={"header-title-part"}>App</span>
        </h1>
      </Link>

      <div className='header-buttons'>
        <Link to={"/"} className='button' onClick={props.filterActual}>
          Actual
        </Link>
        <Link to={"/"} className='button' onClick={props.filterArchive}>
          Archive
        </Link>

        <Link
          to={"/create-edit"}
          className='button'
          onClick={props.createHandler}
        >
          Create
        </Link>
      </div>
    </header>
  );
};

export default Header;
