import React from "react";
import Board from "../../components/Board";
import "./style.scss";

export default function Home({ notes, setSingleNote, loading }) {
  return (
    <div className='home'>
      <Board notes={notes} setSingleNote={setSingleNote} loading={loading} />
    </div>
  );
}
