import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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
  let zawodnik = [];
  const [zawodnik1, setZawodnik1] = useState();
  let licznik = 1;
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
  //useEffect(() => {}, []);

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
        setData(data.data);
        setMiejsce(data.miejsce);
        setGrupa(data.grupa);
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
        Wyświetl turniej tabele wyników
      </button>
      {zawodnik1 && (
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
              {zawodnik1.map((zawodnik) => (
                <tr>
                  <td>{licznik++}</td>
                  <td>{zawodnik.imie}</td>
                  <td>{zawodnik.nazwisko}</td>
                  <td>{zawodnik.punkty}</td>
                  <td>{zawodnik.ilosc_meczy}</td>
                  <td>{zawodnik.elo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Dodaj nowego uczestnika</h2>
          <form>
            <input
              type="text"
              name="imie"
              required="required"
              placeholder="Wprowadź imie"
            ></input>
            <input
              type="text"
              name="nazwisko"
              required="required"
              placeholder="Wprowadź nazwisko"
            ></input>
            <input
              type="text"
              name="elo"
              required="required"
              placeholder="Wprowadź elo"
            ></input>
            <button type="submit">Dodaj</button>
          </form>
        </article>
      )}
    </div>
  );
};
export default TurniejeRozpoczete;
