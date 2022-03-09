import React from "react";

const ReadOnlyRow = ({ zawodnik, handleEditClick, isAuth: isAuth }) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.wygrany.zawodnik.imie}
      </td>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.wygrany.zawodnik.nazwisko}
      </td>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.wygrany.punkty}
      </td>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.przegrany.zawodnik.imie}
      </td>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.przegrany.zawodnik.nazwisko}
      </td>
      <td style={{ textAlign: "center" }}>
        {zawodnik.rezultat.przegrany.punkty}
      </td>
      <td style={{ textAlign: "center" }}>{zawodnik.rezultat.wynik}</td>
      {isAuth && (
        <td>
          <button
            type="button"
            onClick={(event) => handleEditClick(event, zawodnik)}
          >
            Edytuj
          </button>
        </td>
      )}
    </tr>
  );
};

export default ReadOnlyRow;
