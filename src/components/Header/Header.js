import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import noteImage from "../../img/SiteLogo.png";
import { IsModifiedContext } from "../../utils/Contexts";
import "./Header.scss";

const Header = (props) => {
  const [isModified] = useContext(IsModifiedContext);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const buttonsRef = useRef(null);

  const handleBurgerMenuClick = (e) => {
    setIsButtonsVisible(!isButtonsVisible);
    console.log(`Ref: ${buttonsRef.current?.classList}`);
    buttonsRef.current?.classList.toggle("active");
  };

  const handleDocumentClick = (e) => {
    if (!buttonsRef.current.contains(e.target) && isButtonsVisible) {
      setIsButtonsVisible(false);
      buttonsRef.current.classList.remove("active");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isButtonsVisible, buttonsRef]);

  return (
    <header className={"header"}>
      <Link to={"/"} className='note-logo'>
        <img src={noteImage} alt='logo' />
        <h1 className={"header-title"}>
          Noted!<span className={"header-title-part"}>App</span>
        </h1>
      </Link>

      <div className='burger-menu' onClick={(e) => handleBurgerMenuClick(e)}>
        <div className='line' />
        <div className='line' />
        <div className='line' />
      </div>

      <div className='header-buttons' ref={buttonsRef}>
        <button
          className='button'
          onClick={props.saveLayout}
          disabled={!isModified}
        >
          Save
        </button>
        <Link to={"/"} className='button' onClick={props.filterActual}>
          Actual
        </Link>
        <Link to={"/"} className='button' onClick={props.filterArchive}>
          Archive
        </Link>

        <Link
          to={"/create-edit"}
          className='button'
          onClick={() => {
            setIsButtonsVisible(false);
            props.createHandler();
          }}
        >
          Create
        </Link>
      </div>
    </header>
  );
};

export default Header;
