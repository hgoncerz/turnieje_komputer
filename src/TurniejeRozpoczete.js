import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { useEffect } from "react";

const TurniejeRozpoczete = () => {
  const [imie, setImie] = useState();
  const [nazwisko, setNazwisko] = useState();
  const [punkty, setPunkty] = useState();
  const [ilosc_meczy, setIlosc_meczy] = useState();
  const [eloZawodnikow, setEloZawodnikow] = useState();
  const [data, setData] = useState();
  const [miejsce, setMiejsce] = useState();
  const [grupa, setGrupa] = useState();
  const [test, setTest] = useState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  let licznik = 0;

  const rozdzielDane = () => {
    let imie_array = imie.split(" ");
    imie_array.splice(0, 1);
    let nazwisko_array = nazwisko.split(" ");
    nazwisko_array.splice(0, 1);
    const punkty_array = punkty.split(" ");
    const ilosc_meczy_array = ilosc_meczy.split(" ");
    const eloZawodnikow_array = eloZawodnikow.split(" ");
  };

  /*useEffect(() => {
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
      });
  }, []);
  */

  useEffect(() => {
    fetch(`http://localhost:8000/rozpoczety_Turniej/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImie(data.imie);
        setNazwisko(data.nazwisko);
        setPunkty(data.punkty);
        setIlosc_meczy(data.ilosc_meczy);
        setEloZawodnikow(data.eloZawodnikow);
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
      {/*
      {czekanieNaSerwer && <div>Ładowanie...</div>}
      {blad && <div>{blad}</div>}
      {turniej && (
        <article>
          <h2>Data: {turniej.data}</h2>
          <h2>Miejsce: {turniej.miejsce}</h2>
          <h2>Grupa: {turniej.grupa}</h2>
          <br></br>
          <table>
            <thead>
              <tr>
                <th>Poz.</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Punkty</th>
                <th>Mecze</th>
                <th>ELO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </article>
      )}
      */}
      <article>
        <h2>Data: {data}</h2>
        <h2>Miejsce: {miejsce}</h2>
        <h2>Grupa: {grupa}</h2>
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Poz.</th>
              <th>Imie</th>
              <th>Nazwisko</th>
              <th>Punkty</th>
              <th>Mecze</th>
              <th>ELO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
};

export default TurniejeRozpoczete;
