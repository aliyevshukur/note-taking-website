import React from "react";
import Board from "../../components/Board";
import "./style.scss";

export default function Home({ notes, setSingleNote }) {
  return (
    <div className='home'>
      <Board notes={notes} setSingleNote={setSingleNote} />
    </div>
  );
}
