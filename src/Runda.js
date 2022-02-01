import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";

const Runda = () => {
  const { id } = useParams();
  const [mecz, setMecz] = useState();
  const [editZawodnikId, setEditZawodnikId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    punktyWygrany: "",
    punktyPrzegrany: "",
    wynik: "",
  });
  useEffect(() => {
    fetch(`http://localhost:8000/rozpoczety_Turniej/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMecz(data.r1);
        console.log(data.r1);
      });
  }, []);

  const handleEditClick = (event, zawodnik) => {
    event.preventDefault();
    setEditZawodnikId(zawodnik.id);

    const formValues = {
      punktyWygrany: zawodnik.rezultat.wygrany.punkty,
      punktyPrzegrany: zawodnik.rezultat.przegrany.punkty,
      wynik: zawodnik.rezultat.wynik,
    };

    setEditFormData(formValues);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedZawodnik = {
      id: editZawodnikId,
      rezultat: {
        wynik: editFormData.wynik,
        wygrany: {
          zawodnik: {
            imie: "xd",
            nazwisko: "Barak",
          },
          punkty: editFormData.punktyWygrany,
        },
        przegrany: {
          zawodnik: {
            imie: "Klaudia",
            nazwisko: "Derbot",
          },
          punkty: editFormData.punktyPrzegrany,
        },
      },

      // id: editZawodnikId,
      // punktyWygrany: editFormData.punktyWygrany,
      // punktyPrzegrany: editFormData.punktyPrzegrany,
      // wynik: editFormData.wynik,
    };

    const nowiZawodnicy = [...mecz];
    const index = mecz.findIndex((zawodnik) => zawodnik.id === editZawodnikId);

    nowiZawodnicy[index] = editedZawodnik;

    setMecz(nowiZawodnicy);
    setEditZawodnikId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  return (
    <div>
      {mecz && (
        <article>
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Imie</th>
                  <th>Nazwisko</th>
                  <th>Punkty</th>
                  <th>Imie</th>
                  <th>Nazwisko</th>
                  <th>Punkty</th>
                  <th>Rezultat</th>
                  <th>Akcja</th>
                </tr>
              </thead>
              <tbody>
                {/*mecz[0].rezultat.wygrany.zawodnik.imie*/}

                {mecz.map((zawodnik) => (
                  <Fragment>
                    {editZawodnikId === zawodnik.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                      />
                    ) : (
                      <ReadOnlyRow
                        zawodnik={zawodnik}
                        handleEditClick={handleEditClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
        </article>
      )}
    </div>
  );
};

export default Runda;
