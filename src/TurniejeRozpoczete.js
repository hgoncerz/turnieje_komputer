import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
const TurniejeRozpoczete = () => {
  const { id } = useParams();
  const {
    dane: turniej,
    czekanieNaSerwer,
    blad,
  } = useFetch("http://localhost:8000/rozpoczety_Turniej/" + id);

  return (
    <div className="turniejeRozpoczete">
      {czekanieNaSerwer && <div>Ładowanie...</div>}
      {blad && <div>{blad}</div>}
      {turniej && (
        <article>
          <h2>Data: {turniej.data}</h2>
          <h2>Miejsce: {turniej.miejsce}</h2>
          <h2>Grupa: {turniej.grupa}</h2>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Poz.</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Punkty</th>
                <th>Mecze</th>
                <th>ELO</th>
              </tr>
            </thead>
            <tbody>
              {/*rozTurniej.map((tur) => (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))*/}
            </tbody>
          </table>
        </article>
      )}
    </div>
  );
};

export default TurniejeRozpoczete;
