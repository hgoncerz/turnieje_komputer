import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";

const Runda = () => {
  const { id } = useParams();
  const [mecz, setMecz] = useState();
  const [editZawodnikId, setEditZawodnikId] = useState(null);
  const [data, setData] = useState();
  const [grupaRank, setGrupaRank] = useState();
  const [miejsceRank, setMiejsceRank] = useState();
  const [bazaZawodnikow, setBazaZawodnikow] = useState();
  const [imieBaza, setImieBaza] = useState();
  const [nazwiskoBaza, setNazwiskoBaza] = useState();
  const [editFormData, setEditFormData] = useState({
    punktyWygrany: "",
    punktyPrzegrany: "",
    wynik: "",
  });
  useEffect(() => {
    fetch(`http://localhost:8000/zawodnicy`)
      .then((response) => response.json())
      .then((data) => {
        setBazaZawodnikow(data);
      });
    fetch(`http://localhost:8000/rozpoczety_Turniej/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setGrupaRank(data.grupa);
        setMiejsceRank(data.miejsce);
        setImieBaza(data.imie);
        setNazwiskoBaza(data.nazwisko);
        setMecz(data.r1);
      });
  }, []);

  // const wyciagnijElo = (x, y) => {
  //   bazaZawodnikow.forEach((element) => {
  //     if (element.imie === x && element.nazwisko === y) {
  //       return element.elo;
  //     } else {
  //       return null;
  //     }
  //   });
  // };

  const wyliczEloPrzegrany = (
    aktualne_elo_przeciwnika,
    aktualne_elo_zawodnika
  ) => {
    let oczekiwany_wynik;
    let nowy_elo_zawodnika;
    oczekiwany_wynik =
      1 /
      (1 +
        Math.pow(
          10,
          (aktualne_elo_przeciwnika - aktualne_elo_zawodnika) / 400
        ));

    nowy_elo_zawodnika = aktualne_elo_zawodnika + 30 * (0 - oczekiwany_wynik);

    return Math.round(nowy_elo_zawodnika);
  };

  const wyliczEloWygrany = (
    aktualne_elo_przeciwnika,
    aktualne_elo_zawodnika
  ) => {
    let oczekiwany_wynik;
    let nowy_elo_zawodnika;
    oczekiwany_wynik =
      1 /
      (1 +
        Math.pow(
          10,
          (aktualne_elo_przeciwnika - aktualne_elo_zawodnika) / 400
        ));

    nowy_elo_zawodnika = aktualne_elo_zawodnika + 30 * (1 - oczekiwany_wynik);

    return Math.round(nowy_elo_zawodnika);
  };

  const znajdzPozycje = (imie, nazwisko) => {
    let imieTym = imieBaza.split(" ");
    let nazwiskoTym = nazwiskoBaza.split(" ");
    imieTym.shift();
    nazwiskoTym.shift();
    let wynik = null;

    for (let i = 0; i < imieTym.length; i++) {
      if (imieTym[i] === imie && nazwiskoTym[i] === nazwisko) {
        wynik = i;
      }
    }
    return wynik;
  };

  const zatwierdzR1 = () => {
    const updateElo = (imie, nazwisko, noweElo) => {
      bazaZawodnikow.forEach((element) => {
        if (element.imie === imie && element.nazwisko === nazwisko) {
          fetch("http://localhost:8000/zawodnicy/" + element.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              elo: noweElo.toString(),
            }),
          }).then(() => {});
        }
      });
    };
    let punktyR1Wygrany;
    let punktyR1Przegrany;
    let imieWygrany;
    let nazwiskoWygrany;
    let imiePrzegrany;
    let nazwiskoPrzegrany;
    let noweWygrany = [];
    let nowePrzegrany = [];
    let nowePunkty = [];

    mecz.forEach((element) => {
      punktyR1Wygrany = parseInt(element.rezultat.wygrany.punkty);
      punktyR1Przegrany = parseInt(element.rezultat.przegrany.punkty);
      imieWygrany = element.rezultat.wygrany.zawodnik.imie;
      nazwiskoWygrany = element.rezultat.wygrany.zawodnik.nazwisko;
      imiePrzegrany = element.rezultat.przegrany.zawodnik.imie;
      nazwiskoPrzegrany = element.rezultat.przegrany.zawodnik.nazwisko;
      let elo1;
      let elo2;
      let wygralZawodnik;
      let przegralZawodnik;

      if (punktyR1Wygrany > punktyR1Przegrany) {
        noweWygrany.push(punktyR1Wygrany);
        nowePrzegrany.push(punktyR1Przegrany);

        bazaZawodnikow.forEach((element1) => {
          if (
            element1.imie === imieWygrany &&
            element1.nazwisko === nazwiskoWygrany
          ) {
            elo1 = parseInt(element1.elo);
          }
        });

        bazaZawodnikow.forEach((element1) => {
          if (
            element1.imie === imiePrzegrany &&
            element1.nazwisko === nazwiskoPrzegrany
          ) {
            elo2 = parseInt(element1.elo);
          }
        });

        przegralZawodnik = wyliczEloPrzegrany(elo1, elo2);
        wygralZawodnik = wyliczEloWygrany(elo2, elo1);

        updateElo(imieWygrany, nazwiskoWygrany, wygralZawodnik);
        updateElo(imiePrzegrany, nazwiskoPrzegrany, przegralZawodnik);
      } else {
        noweWygrany.push(punktyR1Wygrany);
        nowePrzegrany.push(punktyR1Przegrany);

        bazaZawodnikow.forEach((element1) => {
          if (
            element1.imie === imieWygrany &&
            element1.nazwisko === nazwiskoWygrany
          ) {
            elo1 = parseInt(element1.elo);
          }
        });

        bazaZawodnikow.forEach((element1) => {
          if (
            element1.imie === imiePrzegrany &&
            element1.nazwisko === nazwiskoPrzegrany
          ) {
            elo2 = parseInt(element1.elo);
          }
        });

        przegralZawodnik = wyliczEloPrzegrany(elo2, elo1);
        wygralZawodnik = wyliczEloWygrany(elo1, elo2);

        updateElo(imieWygrany, nazwiskoWygrany, przegralZawodnik);
        updateElo(imiePrzegrany, nazwiskoPrzegrany, wygralZawodnik);
      }
    });

    nowePunkty = noweWygrany.concat(nowePrzegrany).join(" ");

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        punkty: nowePunkty,
        ilosc_meczy: "1 1 1 1",
      }),
    }).then(() => {});
  };

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

    const nowiZawodnicy = [...mecz];
    const index = mecz.findIndex((zawodnik) => zawodnik.id === editZawodnikId);

    const editedZawodnik = {
      id: editZawodnikId,
      rezultat: {
        wynik: editFormData.wynik,
        wygrany: {
          zawodnik: {
            imie: mecz[index].rezultat.wygrany.zawodnik.imie,
            nazwisko: mecz[index].rezultat.wygrany.zawodnik.nazwisko,
          },
          punkty: editFormData.punktyWygrany,
        },
        przegrany: {
          zawodnik: {
            imie: mecz[index].rezultat.przegrany.zawodnik.imie,
            nazwisko: mecz[index].rezultat.przegrany.zawodnik.nazwisko,
          },
          punkty: editFormData.punktyPrzegrany,
        },
      },
    };

    nowiZawodnicy[index] = editedZawodnik;

    setMecz(nowiZawodnicy);

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        r1: nowiZawodnicy,
      }),
    }).then(() => {});
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
          <h1>Mecze rozgrywane:</h1>
          <br></br>
          <h3>
            Data: {data}, miejsce: {miejsceRank}, grupa: {grupaRank}
          </h3>
          <br></br>
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
          <br></br>
          <button type="button" onClick={() => zatwierdzR1()}>
            Zatwierdź runde 1
          </button>
        </article>
      )}
    </div>
  );
};

export default Runda;
