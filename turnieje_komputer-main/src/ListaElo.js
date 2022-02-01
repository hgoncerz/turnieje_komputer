import { Link } from "react-router-dom";
import { useState } from "react";
import { computeHeadingLevel } from "@testing-library/react";
const ListaElo = ({ elo, usunTurniej }) => {
  const [data, setData] = useState(elo);
  let licznik = 1;

  const sorting = (col) => {
    const sorted = [...elo].sort((a, b) =>
      parseInt(a[col]) < parseInt(b[col]) ? 1 : -1
    );
    setData(sorted);
  };
  return (
    <div className="listaElo">
      <h2>ELO ranking zawodników</h2>
      <button onClick={() => sorting("elo")}>
        Sortowanie według Elo zawodników
      </button>
      <br></br>
      <table>
        <tr>
          <th>Pozycja</th>
          <th>Imie</th>
          <th>Nazwisko</th>
          <th>Elo</th>
        </tr>
        {data.map((data) => (
          <tr key={data.id}>
            <td>{licznik++}</td>
            <td>{data.imie}</td>
            <td>{data.nazwisko}</td>
            <td>{data.elo}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ListaElo;
