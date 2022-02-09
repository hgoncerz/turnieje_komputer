import React from "react";

const ReadOnlyRow = ({ zawodnik, handleEditClick, isAuth: isAuth }) => {
  return (
    <tr>
      <td>{zawodnik.rezultat.wygrany.zawodnik.imie}</td>
      <td>{zawodnik.rezultat.wygrany.zawodnik.nazwisko}</td>
      <td>{zawodnik.rezultat.wygrany.punkty}</td>
      <td>{zawodnik.rezultat.przegrany.zawodnik.imie}</td>
      <td>{zawodnik.rezultat.przegrany.zawodnik.nazwisko}</td>
      <td>{zawodnik.rezultat.przegrany.punkty}</td>
      <td>{zawodnik.rezultat.wynik}</td>
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
