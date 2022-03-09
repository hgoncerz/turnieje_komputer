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
      <h2>Tabela z rankingiem zawodników:</h2>
      <br></br>
      <button onClick={() => sorting("elo")}>
        Sortowanie według Elo zawodników
      </button>
      <br></br>
      <br></br>
      <table>
        <tr>
          <th
            style={{
              backgroundColor: "#377db8",
              color: "#ddd",
              textAlign: "center",
            }}
          >
            Poz.
          </th>
          <th
            style={{
              backgroundColor: "#377db8",
              color: "#ddd",
              textAlign: "center",
            }}
          >
            Imię
          </th>
          <th
            style={{
              backgroundColor: "#377db8",
              color: "#ddd",
              textAlign: "center",
            }}
          >
            Nazwisko
          </th>
          <th
            style={{
              backgroundColor: "#377db8",
              color: "#ddd",
              textAlign: "center",
            }}
          >
            Elo
          </th>
        </tr>
        {data.map((data) => (
          <tr key={data.id}>
            <td style={{ textAlign: "center" }}>{licznik++}</td>
            <td style={{ textAlign: "center" }}>{data.imie}</td>
            <td style={{ textAlign: "center" }}>{data.nazwisko}</td>
            <td style={{ textAlign: "center" }}>{data.elo}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ListaElo;
