import React from "react";
import useFetch from "./useFetch";
import ListaRozpoczetychTurniejow from "./ListaRozpoczetychTurniejow";

export default function RozpocznijTurniej() {
  const {
    dane: rozpoczeteTurnieje,
    czekanieNaSerwer,
    blad,
  } = useFetch("http://localhost:8000/rozpoczety_Turniej");
  return (
    <div className="rozpocznij-turniej">
      {blad && <div>{blad}</div>}
      {czekanieNaSerwer && <div>Wczytywanie...</div>}
      {rozpoczeteTurnieje && (
        <ListaRozpoczetychTurniejow rozpoczeteTurnieje={rozpoczeteTurnieje} />
      )}
    </div>
  );
}
