import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange }) => {
  return (
    <tr>
      <td>Imię</td>
      <td>Nazwisko</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Punkty"
          name="punktyWygrany"
          value={editFormData.punktyWygrany}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>Imię</td>
      <td>Nazwisko</td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Punkty"
          name="punktyPrzegrany"
          value={editFormData.punktyPrzegrany}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Rezultat"
          name="wynik"
          value={editFormData.wynik}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Zapisz</button>
      </td>
    </tr>
  );
};

export default EditableRow;
