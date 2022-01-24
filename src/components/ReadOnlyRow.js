import React from "react";

const ReadOnlyRow = ({ zawodnik }) => {
  return (
    <tr>
      <td>1</td>
      <td>{zawodnik.imie}</td>
      <td>{zawodnik.nazwisko}</td>
      <td>{zawodnik.punkty}</td>
      <td>{zawodnik.ilosc_meczy}</td>
      <td>{zawodnik.elo}</td>
    </tr>
  );
};

export default ReadOnlyRow;
