import React from "react";
import Board from "../../components/Board";
import "./style.scss";

export default function Home({ setSingleNote, loading, filter }) {
  return (
    <div className='home'>
      <Board setSingleNote={setSingleNote} loading={loading} filter={filter} />
    </div>
  );
}
