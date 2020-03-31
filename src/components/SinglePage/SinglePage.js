import React from 'react';
import Button from "../Button/Button";
// import Note from 'components/Note.js'

const SinglePage = (props) => {
    return (
        <div className="noteContainer">
           {/*<Note/>*/}
           <div className="noteButtons">
               <Button/>
               <Button/>
               <Button/>
           </div>
        </div>
    );
};

export default SinglePage;