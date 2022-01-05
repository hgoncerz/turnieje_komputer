import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect, useState } from "react";
import WyswietlZawodnikow from "./WyswietlZawodnikow";

const TurniejeInfo = () => {
  const [imie, setImie] = useState();
  const [nazwisko, setNazwisko] = useState();
  const [haslo, setHaslo] = useState();
  const [imie_poczatkowe, setImie_pocz] = useState(null);
  const [nazwisko_poczatkowe, setNazwisko_pocz] = useState();
  const [array1, setArray1] = useState();
  const [elo, setElo] = useState();
  const [ileUczestnikow, setIleUczestnikow] = useState();
  const [data, setData] = useState();
  const [miejsce, setMiejsce] = useState();
  const { id } = useParams();
  const {
    dane: turniej,
    czekanieNaSerwer,
    blad,
  } = useFetch("http://localhost:8000/turnieje/" + id);

  const historia = useHistory();
  const usunTurniej = () => {
    fetch("http://localhost:8000/turnieje/" + turniej.id, {
      method: "DELETE",
    }).then(() => {
      historia.push("/");
    });
  };

  const rozpocznijTurniej = (e) => {
    e.preventDefault();
    const zawodnik_array = imie_poczatkowe[0].split(" ");
    const zawodnik_array_nazwisko = nazwisko_poczatkowe[0].split(" ");
    let eloTymczasowe = [];
    let punktyTym = [];
    let ilosc_meczyTym = [];
    let r1Tym = [];

    //wyszukanie elo zawodnika po liscie startowej z bazy zawodnicy
    const sprawdzenie = array1.map(function (zawodnik) {
      for (let i = 1; i <= zawodnik_array.length; i++) {
        if (
          zawodnik_array[i] === zawodnik.imie &&
          zawodnik_array_nazwisko[i] === zawodnik.nazwisko
        ) {
          eloTymczasowe.push(zawodnik.elo);
          punktyTym.push("0");
          ilosc_meczyTym.push("0");
        }
      }
    });

    for (let i = 1; i <= zawodnik_array.length; i++) {
      if (i <= zawodnik_array.length / 2) {
        r1Tym.push(zawodnik_array[i]);
        r1Tym.push(zawodnik_array_nazwisko[i]);
      } else {
        r1Tym.push(zawodnik_array[i]);
        r1Tym.push(zawodnik_array_nazwisko[i]);
      }
    }
    const r1 = r1Tym.join(" ");
    const r2 = " ";
    const r3 = " ";
    const imie = imie_poczatkowe.join(" ");
    const nazwisko = nazwisko_poczatkowe.join(" ");
    const eloZawodnikow = eloTymczasowe.join(" ");
    const punkty = punktyTym.join(" ");
    const ilosc_meczy = ilosc_meczyTym.join(" ");
    const grupa = elo;
    const rozpoczety_turniej = {
      imie,
      nazwisko,
      punkty,
      ilosc_meczy,
      r1,
      r2,
      r3,
      eloZawodnikow,
      data,
      miejsce,
      grupa,
    };

    fetch("http://localhost:8000/rozpoczety_Turniej", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rozpoczety_turniej),
    }).then(() => {
      console.log("rozpoczety turniej");
      historia.push("/");
    });
  };
  //wyciągnięcie wszystkich zawodników z bazy do sprawdzenia czy taki użytkonik jest w bazie
  useEffect(() => {
    fetch(`http://localhost:8000/zawodnicy`)
      .then((response) => response.json())
      .then((data) => {
        setArray1(data);
      });
  }, []);
  //wyciąganie zawodników z konkretnego turnieju
  useEffect(() => {
    fetch(`http://localhost:8000/turnieje/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setMiejsce(data.miejsce);
        setImie_pocz([data.imie]);
        setNazwisko_pocz([data.nazwisko]);
        setElo(data.grupa);
        setIleUczestnikow(data.ile);
      });
  }, []);

  const przyciskZapisz = (e) => {
    e.preventDefault();
    //funkcja do sprawdzenia czy zawodnik jest w bazie
    let parseElo = parseInt(elo, 10);
    let parseIleUcz = parseInt(ileUczestnikow, 10);
    const zawodnik_array = imie_poczatkowe[0].split(" ");
    const zawodnik_array_nazwisko = nazwisko_poczatkowe[0].split(" ");
    let liczba_aktualnych_zawodnikow = zawodnik_array.length - 1;

    //sprawdzenie czy istnieju już w turnieju ten zawodnik?
    let istnieje_w_turnieju = false;
    for (let i = 1; i < zawodnik_array.length; i++) {
      if (zawodnik_array[i] == imie && zawodnik_array_nazwisko[i] == nazwisko) {
        console.log("takie imie i nazwisko jest już na liscie");
        istnieje_w_turnieju = true;
      }
    }
    let czyJestTaki = false;
    const sprawdzenie = array1.map(function (zawodnik) {
      if (
        zawodnik.imie === imie &&
        zawodnik.nazwisko === nazwisko &&
        zawodnik.haslo === haslo &&
        zawodnik.elo >= parseElo
      ) {
        czyJestTaki = true;
      }
    });
    if (
      czyJestTaki &&
      !istnieje_w_turnieju &&
      liczba_aktualnych_zawodnikow < parseIleUcz
    ) {
      console.log("Czy dodano nowego zawodnika? " + czyJestTaki);
      const wpisaneImie = imie_poczatkowe + " " + imie;
      const wpisaneNazwisko = nazwisko_poczatkowe + " " + nazwisko;
      fetch("http://localhost:8000/turnieje/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imie: wpisaneImie,
          nazwisko: wpisaneNazwisko,
        }),
      }).then(() => {
        console.log("dodano nowego zawodnika");
        historia.push("/dodanoDoTurnieju");
      });
    } else {
      console.log("Nieprawidłowy login lub zbyt niski ranking");
      historia.push("/nieDodanoDoTurnieju");
    }
  };

  return (
    <div className="turnieje-info">
      {czekanieNaSerwer && <div>Ładowanie...</div>}
      {blad && <div>{blad}</div>}
      {turniej && (
        <article>
          <h2>Data: {turniej.data}</h2>
          <h2>Miejsce: {turniej.miejsce}</h2>
          <h2>Grupa: {turniej.grupa}</h2>
          <div>Kontakt: {turniej.kontakt}</div>
          <div>Ilosc maksymalna uczestnikow: {turniej.ile}</div>
          <div>Opis Turnieju: {turniej.opis_turnieju}</div>

          <button onClick={usunTurniej}>usuń turniej</button>
          <br></br>
          <br></br>
          <button onClick={rozpocznijTurniej}>Rozpocznij Turniej</button>
          <h2>Zapisz się do turnieju:</h2>
          <form onSubmit={przyciskZapisz}>
            <label>Imie</label>
            <br></br>
            <input
              type="text"
              required
              value={imie}
              onChange={(e) => setImie(e.target.value)}
            />
            <br></br>
            <label>Nazwisko</label>
            <br></br>
            <input
              required
              value={nazwisko}
              onChange={(e) => setNazwisko(e.target.value)}
            ></input>
            <br></br>
            <label>Hasło</label>
            <br></br>
            <input
              type="password"
              required
              value={haslo}
              onChange={(e) => setHaslo(e.target.value)}
            ></input>
            <br></br>
            <button>Zapisz się</button>
          </form>
        </article>
      )}
      <WyswietlZawodnikow />
    </div>
  );
};

export default TurniejeInfo;
