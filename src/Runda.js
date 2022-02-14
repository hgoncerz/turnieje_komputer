import { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";

const Runda = ({ isAuth: isAuth }) => {
  const { id } = useParams();
  const [mecz, setMecz] = useState();
  const [mecz2, setMecz2] = useState();
  const [mecz3, setMecz3] = useState();
  const [punktyBaza, setPunktyBaza] = useState();
  const [editZawodnikId, setEditZawodnikId] = useState(null);
  const [editZawodnikId2, setEditZawodnikId2] = useState(null);
  const [editZawodnikId3, setEditZawodnikId3] = useState(null);
  const [data, setData] = useState();
  const [grupaRank, setGrupaRank] = useState();
  const [miejsceRank, setMiejsceRank] = useState();
  const [bazaZawodnikow, setBazaZawodnikow] = useState();
  const [imieBaza, setImieBaza] = useState();
  const [nazwiskoBaza, setNazwiskoBaza] = useState();
  let historia = useHistory();
  const [editFormData, setEditFormData] = useState({
    punktyWygrany: "",
    punktyPrzegrany: "",
    wynik: "",
  });
  const [editFormData2, setEditFormData2] = useState({
    punktyWygrany: "",
    punktyPrzegrany: "",
    wynik: "",
  });
  const [editFormData3, setEditFormData3] = useState({
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
        setPunktyBaza(data.punkty);
        setData(data.data);
        setGrupaRank(data.grupa);
        setMiejsceRank(data.miejsce);
        setImieBaza(data.imie);
        setNazwiskoBaza(data.nazwisko);
        setMecz(data.r1);
        setMecz2(data.r2);
        setMecz3(data.r3);
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
    let meczyk = [];
    let ilosc = noweWygrany.length + nowePrzegrany.length;

    for (let i = 0; i < ilosc; i++) {
      meczyk.push(1);
    }
    const mecze_iloscowe = meczyk.join(" ");

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        punkty: nowePunkty,
        ilosc_meczy: mecze_iloscowe,
      }),
    }).then(() => {});
  };

  const zatwierdzR2 = () => {
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

    const pozycja = (imie, nazwisko) => {
      let imiona = imieBaza.split(" ");
      let nazwiska = nazwiskoBaza.split(" ");

      imiona.shift();
      nazwiska.shift();

      let pozycja = 0;

      for (let i = 0; i < imiona.length; i++) {
        if (imiona[i] === imie && nazwiska[i] === nazwisko) {
          pozycja = i;
        }
      }
      return pozycja;
    };

    let starePunkty = punktyBaza.split(" ");
    let zawodnicy2Wygrany = [];
    let zawodnicy2Przegrany = [];

    mecz2.forEach((element) => {
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

      zawodnicy2Wygrany.push({
        imie: imieWygrany,
        nazwisko: nazwiskoWygrany,
        punkty: punktyR1Wygrany,
      });

      zawodnicy2Przegrany.push({
        imie: imiePrzegrany,
        nazwisko: nazwiskoPrzegrany,
        punkty: punktyR1Przegrany,
      });

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

    let meczyk = [];
    let ilosc = noweWygrany.length + nowePrzegrany.length;

    for (let i = 0; i < ilosc; i++) {
      meczyk.push(2);
    }
    const mecze_iloscowe = meczyk.join(" ");

    let zawodnicyWszyscy = zawodnicy2Przegrany.concat(zawodnicy2Wygrany);

    let indeks2;
    let nowyPunkt;

    for (let i = 0; i < zawodnicyWszyscy.length; i++) {
      indeks2 = pozycja(zawodnicyWszyscy[i].imie, zawodnicyWszyscy[i].nazwisko);
      nowyPunkt = parseInt(starePunkty[indeks2]) + zawodnicyWszyscy[i].punkty;
      starePunkty.splice(indeks2, 1, nowyPunkt);
    }

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        punkty: starePunkty.join(" "),
        ilosc_meczy: mecze_iloscowe,
      }),
    }).then(() => {});
  };

  const zatwierdzR3 = () => {
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

    const pozycja = (imie, nazwisko) => {
      let imiona = imieBaza.split(" ");
      let nazwiska = nazwiskoBaza.split(" ");

      imiona.shift();
      nazwiska.shift();

      let pozycja = 0;

      for (let i = 0; i < imiona.length; i++) {
        if (imiona[i] === imie && nazwiska[i] === nazwisko) {
          pozycja = i;
        }
      }
      return pozycja;
    };

    let starePunkty = punktyBaza.split(" ");
    let zawodnicy2Wygrany = [];
    let zawodnicy2Przegrany = [];

    mecz2.forEach((element) => {
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

      zawodnicy2Wygrany.push({
        imie: imieWygrany,
        nazwisko: nazwiskoWygrany,
        punkty: punktyR1Wygrany,
      });

      zawodnicy2Przegrany.push({
        imie: imiePrzegrany,
        nazwisko: nazwiskoPrzegrany,
        punkty: punktyR1Przegrany,
      });

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

    let meczyk = [];
    let ilosc = noweWygrany.length + nowePrzegrany.length;

    for (let i = 0; i < ilosc; i++) {
      meczyk.push(3);
    }
    const mecze_iloscowe = meczyk.join(" ");

    let zawodnicyWszyscy = zawodnicy2Przegrany.concat(zawodnicy2Wygrany);

    let indeks2;
    let nowyPunkt;

    for (let i = 0; i < zawodnicyWszyscy.length; i++) {
      indeks2 = pozycja(zawodnicyWszyscy[i].imie, zawodnicyWszyscy[i].nazwisko);
      nowyPunkt = parseInt(starePunkty[indeks2]) + zawodnicyWszyscy[i].punkty;
      starePunkty.splice(indeks2, 1, nowyPunkt);
    }

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        punkty: starePunkty.join(" "),
        ilosc_meczy: mecze_iloscowe,
      }),
    }).then(() => {});
  };

  const losowanieR2 = () => {
    let punktyR1Wygrany;
    let punktyR1Przegrany;
    let imieWygrany;
    let nazwiskoWygrany;
    let imiePrzegrany;
    let nazwiskoPrzegrany;
    // let imie_polaczone = [];
    // let nazwisko_polaczone = [];
    // let punkty_polaczone = [];
    // let ilosc_meczy_polaczone = [];
    // let eloZawodnikow_polaczone = [];
    //funkcja kto wygrał dodać ich do tablicy wygrany i osobno przegrani do tablicy przegranych
    let arrayWygraliImie = [];
    let arrayWygraliNazwisko = [];
    let arrayPrzegraliImie = [];
    let arrayPrzegraliNazwisko = [];

    mecz.forEach((element) => {
      punktyR1Wygrany = parseInt(element.rezultat.wygrany.punkty);
      punktyR1Przegrany = parseInt(element.rezultat.przegrany.punkty);
      imieWygrany = element.rezultat.wygrany.zawodnik.imie;
      nazwiskoWygrany = element.rezultat.wygrany.zawodnik.nazwisko;
      imiePrzegrany = element.rezultat.przegrany.zawodnik.imie;
      nazwiskoPrzegrany = element.rezultat.przegrany.zawodnik.nazwisko;

      if (punktyR1Wygrany > punktyR1Przegrany) {
        arrayWygraliImie.push(imieWygrany);
        arrayWygraliNazwisko.push(nazwiskoWygrany);
        arrayPrzegraliImie.push(imiePrzegrany);
        arrayPrzegraliNazwisko.push(nazwiskoPrzegrany);
      } else {
        arrayWygraliImie.push(imiePrzegrany);
        arrayWygraliNazwisko.push(nazwiskoPrzegrany);
        arrayPrzegraliImie.push(imieWygrany);
        arrayPrzegraliNazwisko.push(nazwiskoWygrany);
      }
    });

    let polaczona_imie = arrayWygraliImie.concat(arrayPrzegraliImie);
    let polaczona_nazwisko = arrayWygraliNazwisko.concat(
      arrayPrzegraliNazwisko
    );
    let r2x = [];
    console.log(polaczona_imie);
    console.log(polaczona_nazwisko);
    let licznik_id = 0;

    for (let i = 0; i < polaczona_nazwisko.length; i++) {
      r2x.push({
        id: licznik_id,
        rezultat: {
          wynik: "-",
          wygrany: {
            zawodnik: {
              imie: polaczona_imie[i],
              nazwisko: polaczona_nazwisko[i],
            },
            punkty: "-",
          },
          przegrany: {
            zawodnik: {
              imie: polaczona_imie[i + 1],
              nazwisko: polaczona_nazwisko[i + 1],
            },
            punkty: "-",
          },
        },
      });
      licznik_id++;
      i++;
    }
    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        r2: r2x,
      }),
    }).then(() => {
      //console.log("dodano nowego zawodnika");
      historia.push("/turniejeRozpoczete/" + id);
    });
  };

  const losowanieR3 = () => {
    let punktyR1Wygrany;
    let punktyR1Przegrany;
    let imieWygrany;
    let nazwiskoWygrany;
    let imiePrzegrany;
    let nazwiskoPrzegrany;
    // let imie_polaczone = [];
    // let nazwisko_polaczone = [];
    // let punkty_polaczone = [];
    // let ilosc_meczy_polaczone = [];
    // let eloZawodnikow_polaczone = [];
    //funkcja kto wygrał dodać ich do tablicy wygrany i osobno przegrani do tablicy przegranych
    let arrayWygraliImie = [];
    let arrayWygraliNazwisko = [];
    let arrayPrzegraliImie = [];
    let arrayPrzegraliNazwisko = [];

    mecz.forEach((element) => {
      punktyR1Wygrany = parseInt(element.rezultat.wygrany.punkty);
      punktyR1Przegrany = parseInt(element.rezultat.przegrany.punkty);
      imieWygrany = element.rezultat.wygrany.zawodnik.imie;
      nazwiskoWygrany = element.rezultat.wygrany.zawodnik.nazwisko;
      imiePrzegrany = element.rezultat.przegrany.zawodnik.imie;
      nazwiskoPrzegrany = element.rezultat.przegrany.zawodnik.nazwisko;

      if (punktyR1Wygrany > punktyR1Przegrany) {
        arrayWygraliImie.push(imieWygrany);
        arrayWygraliNazwisko.push(nazwiskoWygrany);
        arrayPrzegraliImie.push(imiePrzegrany);
        arrayPrzegraliNazwisko.push(nazwiskoPrzegrany);
      } else {
        arrayWygraliImie.push(imiePrzegrany);
        arrayWygraliNazwisko.push(nazwiskoPrzegrany);
        arrayPrzegraliImie.push(imieWygrany);
        arrayPrzegraliNazwisko.push(nazwiskoWygrany);
      }
    });

    let polaczona_imie = arrayWygraliImie.concat(arrayPrzegraliImie);
    let polaczona_nazwisko = arrayWygraliNazwisko.concat(
      arrayPrzegraliNazwisko
    );
    let r2x = [];
    console.log(polaczona_imie);
    console.log(polaczona_nazwisko);
    let licznik_id = 0;

    for (let i = 0; i < polaczona_nazwisko.length; i++) {
      r2x.push({
        id: licznik_id,
        rezultat: {
          wynik: "-",
          wygrany: {
            zawodnik: {
              imie: polaczona_imie[i],
              nazwisko: polaczona_nazwisko[i],
            },
            punkty: "-",
          },
          przegrany: {
            zawodnik: {
              imie: polaczona_imie[i + 1],
              nazwisko: polaczona_nazwisko[i + 1],
            },
            punkty: "-",
          },
        },
      });
      licznik_id++;
      i++;
    }
    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        r3: r2x,
      }),
    }).then(() => {
      //console.log("dodano nowego zawodnika");
      historia.push("/turniejeRozpoczete/" + id);
    });
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
  const handleEditClick2 = (event, zawodnik) => {
    event.preventDefault();
    setEditZawodnikId2(zawodnik.id);

    const formValues = {
      punktyWygrany: zawodnik.rezultat.wygrany.punkty,
      punktyPrzegrany: zawodnik.rezultat.przegrany.punkty,
      wynik: zawodnik.rezultat.wynik,
    };

    setEditFormData2(formValues);
  };
  const handleEditClick3 = (event, zawodnik) => {
    event.preventDefault();
    setEditZawodnikId3(zawodnik.id);

    const formValues = {
      punktyWygrany: zawodnik.rezultat.wygrany.punkty,
      punktyPrzegrany: zawodnik.rezultat.przegrany.punkty,
      wynik: zawodnik.rezultat.wynik,
    };

    setEditFormData3(formValues);
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

  const handleEditFormSubmit2 = (event) => {
    event.preventDefault();

    const nowiZawodnicy = [...mecz2];
    const index = mecz2.findIndex(
      (zawodnik) => zawodnik.id === editZawodnikId2
    );

    const editedZawodnik = {
      id: editZawodnikId2,
      rezultat: {
        wynik: editFormData2.wynik,
        wygrany: {
          zawodnik: {
            imie: mecz2[index].rezultat.wygrany.zawodnik.imie,
            nazwisko: mecz2[index].rezultat.wygrany.zawodnik.nazwisko,
          },
          punkty: editFormData2.punktyWygrany,
        },
        przegrany: {
          zawodnik: {
            imie: mecz2[index].rezultat.przegrany.zawodnik.imie,
            nazwisko: mecz2[index].rezultat.przegrany.zawodnik.nazwisko,
          },
          punkty: editFormData2.punktyPrzegrany,
        },
      },
    };

    nowiZawodnicy[index] = editedZawodnik;

    setMecz2(nowiZawodnicy);

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        r2: nowiZawodnicy,
      }),
    }).then(() => {});
    setEditZawodnikId2(null);
  };

  const handleEditFormSubmit3 = (event) => {
    event.preventDefault();

    const nowiZawodnicy = [...mecz3];
    const index = mecz3.findIndex(
      (zawodnik) => zawodnik.id === editZawodnikId3
    );

    const editedZawodnik = {
      id: editZawodnikId3,
      rezultat: {
        wynik: editFormData3.wynik,
        wygrany: {
          zawodnik: {
            imie: mecz3[index].rezultat.wygrany.zawodnik.imie,
            nazwisko: mecz3[index].rezultat.wygrany.zawodnik.nazwisko,
          },
          punkty: editFormData3.punktyWygrany,
        },
        przegrany: {
          zawodnik: {
            imie: mecz3[index].rezultat.przegrany.zawodnik.imie,
            nazwisko: mecz3[index].rezultat.przegrany.zawodnik.nazwisko,
          },
          punkty: editFormData3.punktyPrzegrany,
        },
      },
    };

    nowiZawodnicy[index] = editedZawodnik;

    setMecz3(nowiZawodnicy);

    fetch("http://localhost:8000/rozpoczety_Turniej/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        r3: nowiZawodnicy,
      }),
    }).then(() => {});
    setEditZawodnikId3(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormChange2 = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData2 };
    newFormData[fieldName] = fieldValue;

    setEditFormData2(newFormData);
  };

  const handleEditFormChange3 = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData3 };
    newFormData[fieldName] = fieldValue;

    setEditFormData3(newFormData);
  };

  const zakonczTurniej = () => {};

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
                  {isAuth && <th>Akcja</th>}
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
                        isAuth={isAuth}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
          <br></br>
          {isAuth && (
            <div>
              {" "}
              <button type="button" onClick={() => zatwierdzR1()}>
                Zatwierdź runde 1
              </button>
              <button type="button" onClick={() => losowanieR2()}>
                Wylosuj 2 runde
              </button>
            </div>
          )}
        </article>
      )}
      {mecz2 && (
        <article>
          <br></br>
          <h1>Runda 2</h1>
          <br></br>
          <form onSubmit={handleEditFormSubmit2}>
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
                  {isAuth && <th>Akcja</th>}
                </tr>
              </thead>
              <tbody>
                {mecz2.map((zawodnik) => (
                  <Fragment>
                    {editZawodnikId2 === zawodnik.id ? (
                      <EditableRow
                        editFormData={editFormData2}
                        handleEditFormChange={handleEditFormChange2}
                      />
                    ) : (
                      <ReadOnlyRow
                        zawodnik={zawodnik}
                        handleEditClick={handleEditClick2}
                        isAuth={isAuth}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
          <br></br>
          {isAuth && (
            <div>
              <button type="button" onClick={() => zatwierdzR2()}>
                Zatwierdź runde 2
              </button>
              <button type="button" onClick={() => losowanieR3()}>
                Wylosuj 3 runde
              </button>{" "}
            </div>
          )}
        </article>
      )}
      {mecz3 && (
        <article>
          <br></br>
          <h1>Runda 3</h1>
          <br></br>
          <form onSubmit={handleEditFormSubmit3}>
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
                  {isAuth && <th>Akcja</th>}
                </tr>
              </thead>
              <tbody>
                {mecz3.map((zawodnik) => (
                  <Fragment>
                    {editZawodnikId3 === zawodnik.id ? (
                      <EditableRow
                        editFormData={editFormData3}
                        handleEditFormChange={handleEditFormChange3}
                      />
                    ) : (
                      <ReadOnlyRow
                        zawodnik={zawodnik}
                        handleEditClick={handleEditClick3}
                        isAuth={isAuth}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>
          <br></br>
          {isAuth && (
            <div>
              <button type="button" onClick={() => zatwierdzR3()}>
                Zatwierdź runde 3
              </button>
              <button type="button" onClick={() => zakonczTurniej()}>
                Zakończ Turniej
              </button>
            </div>
          )}
        </article>
      )}
    </div>
  );
};

export default Runda;
