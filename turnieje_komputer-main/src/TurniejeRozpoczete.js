import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const TurniejeRozpoczete = () => {
  const [imie, setImie] = useState();
  const [nazwisko, setNazwisko] = useState();
  const [punkty, setPunkty] = useState();
  const [ilosc_meczy, setIlosc_meczy] = useState();
  const [eloZawodnikow, setEloZawodnikow] = useState();
  const [data, setData] = useState();
  const [miejsce, setMiejsce] = useState();
  const [grupa, setGrupa] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  let zawodnik = [];
  const [zawodnik1, setZawodnik1] = useState();
  const [zawodnicyBaza, setZawodnicyBaza] = useState();
  const [r1, setR1] = useState();
  let licznik = 1;
  const [dodajDataForm, setDodajDataForm] = useState({
    imie: "",
    nazwisko: "",
    elo: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8000/zawodnicy`)
      .then((response) => response.json())
      .then((data) => {
        setZawodnicyBaza(data);
      });
  }, []);

  const handleAddFormChange = (e) => {
    e.preventDefault();

    const zawodnikRow = e.target.getAttribute("name");
    const zawodnikWartosc = e.target.value;

    const nowyDataForm = { ...dodajDataForm };
    nowyDataForm[zawodnikRow] = zawodnikWartosc;

    setDodajDataForm(nowyDataForm);
  };

  const losowanieR1 = () => {
    let imie_polaczone = [];
    let nazwisko_polaczone = [];
    let punkty_polaczone = [];
    let ilosc_meczy_polaczone = [];
    let eloZawodnikow_polaczone = [];

    for (let i = 0; i < zawodnik1.length; i++) {
      imie_polaczone.push(zawodnik1[i].imie);
      nazwisko_polaczone.push(zawodnik1[i].nazwisko);
      punkty_polaczone.push(zawodnik1[i].punkty);
      ilosc_meczy_polaczone.push(zawodnik1[i].ilosc_meczy);
      eloZawodnikow_polaczone.push(zawodnik1[i].elo);
    }
    console.log(imie_polaczone.join(" "));
    console.log(nazwisko_polaczone.join(" "));
    console.log(punkty_polaczone.join(" "));
    console.log(ilosc_meczy_polaczone.join(" "));

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imie: " " + imie_polaczone.join(" "),
        nazwisko: " " + nazwisko_polaczone.join(" "),
        punkty: punkty_polaczone.join(" "),
        ilosc_meczy: ilosc_meczy_polaczone.join(" "),
        eloZawodnikow: eloZawodnikow_polaczone.join(" "),
      }),
    }).then(() => {
      //console.log("dodano nowego zawodnika");
      // historia.push("/dodanoDoTurnieju");
    });
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    let eloWyswietl = "0";
    console.log("tutaj0");
    console.log(zawodnik1[1].imie);

    let nowyZawodnik1;

    let czyJestTaki = false;
    const sprawdzenie = zawodnicyBaza.map(function (zawodnik) {
      if (
        zawodnik.imie === dodajDataForm.imie &&
        zawodnik.nazwisko === dodajDataForm.nazwisko
      ) {
        czyJestTaki = true;
        eloWyswietl = zawodnik.elo;
      }
    });
    if (czyJestTaki) {
      console.log("jest taki i elo to: " + eloWyswietl);
      const nowyZawodnik = {
        id: nanoid(),
        imie: dodajDataForm.imie,
        nazwisko: dodajDataForm.nazwisko,
        punkty: "0",
        ilosc_meczy: "0",
        elo: eloWyswietl,
      };
      nowyZawodnik1 = [...zawodnik1, nowyZawodnik];
    } else {
      nowyZawodnik1 = [...zawodnik1];
      console.log("nie dodano bo nie ma w bazie");
    }

    console.log(zawodnicyBaza);
    setZawodnik1(nowyZawodnik1);
  };

  const handleDeleteClick = (zawodnikId) => {
    const nowyZawodnik1 = [...zawodnik1];
    const index = zawodnik1.findIndex((zawodnik) => zawodnik.id === zawodnikId);
    nowyZawodnik1.splice(index, 1);
    setZawodnik1(nowyZawodnik1);
  };

  const rozdzielDane = () => {
    let imie_array = imie.split(" ");
    imie_array.splice(0, 1);
    let nazwisko_array = nazwisko.split(" ");
    nazwisko_array.splice(0, 1);
    const punkty_array = punkty.split(" ");
    const ilosc_meczy_array = ilosc_meczy.split(" ");
    const eloZawodnikow_array = eloZawodnikow.split(" ");

    for (let i = 0; i < imie_array.length; i++) {
      zawodnik.push({
        imie: imie_array[i],
        nazwisko: nazwisko_array[i],
        punkty: punkty_array[i],
        ilosc_meczy: ilosc_meczy_array[i],
        elo: eloZawodnikow_array[i],
      });
    }
    console.log(zawodnik);
    return zawodnik;
  };

  useEffect(() => {
    fetch(`http://localhost:8000/rozpoczety_Turniej/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImie(data.imie);
        setNazwisko(data.nazwisko);
        setPunkty(data.punkty);
        setIlosc_meczy(data.ilosc_meczy);
        setEloZawodnikow(data.eloZawodnikow);
        setData(data.data);
        setMiejsce(data.miejsce);
        setGrupa(data.grupa);
        setR1(data.r1);
        setLoading(false);
      });
  }, []);

  if (
    imie !== undefined &&
    nazwisko !== undefined &&
    punkty !== undefined &&
    ilosc_meczy !== undefined &&
    eloZawodnikow !== undefined
  ) {
    if (loading) {
      rozdzielDane();
    }
  }

  return (
    <div className="turniejeRozpoczete">
      <button onClick={() => setZawodnik1(rozdzielDane())}>
        Wy??wietl turniej tabele wynik??w
      </button>
      {zawodnik1 && (
        <article>
          <h2>Data: {data}</h2>
          <h2>Miejsce: {miejsce}</h2>
          <h2>Grupa: {grupa}</h2>
          <br></br>
          <form>
            <table>
              <thead>
                <tr>
                  <th>Poz.</th>
                  <th>Imie</th>
                  <th>Nazwisko</th>
                  <th>Punkty</th>
                  <th>Mecze</th>
                  <th>ELO</th>
                  <th>Akcja</th>
                </tr>
              </thead>
              <tbody>
                {zawodnik1.map((zawodnik) => (
                  <tr>
                    <td>{licznik++}</td>
                    <td>{zawodnik.imie}</td>
                    <td>{zawodnik.nazwisko}</td>
                    <td>{zawodnik.punkty}</td>
                    <td>{zawodnik.ilosc_meczy}</td>
                    <td>{zawodnik.elo}</td>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(zawodnik.id)}
                    >
                      Usu??
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <h2>Dodaj nowego uczestnika</h2>
          <a>U??ytkownik musi by?? w bazie zawodnik??w</a>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="imie"
              required="required"
              placeholder="Wprowad?? imie"
              onChange={handleAddFormChange}
            ></input>
            <input
              type="text"
              name="nazwisko"
              required="required"
              placeholder="Wprowad?? nazwisko"
              onChange={handleAddFormChange}
            ></input>
            <button type="submit">Dodaj</button>
          </form>
          <button type="button" onClick={() => losowanieR1()}>
            Wylosuj pary
          </button>
          <br></br>
          <br></br>
          <Link to={"/runda/" + id}>Przejd?? do meczy</Link>
        </article>
      )}
    </div>
  );
};
export default TurniejeRozpoczete;
