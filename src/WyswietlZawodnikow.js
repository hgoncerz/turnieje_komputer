import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
const WyswietlZawodnikow = () => {
  const [imieZaw, setImieZaw] = useState();
  const [nazwiskoZaw, setNazwiskoZaw] = useState();
  const [lista, setLista] = useState();
  const [wyswietlListe, setWyswietlListe] = useState();
  const { id } = useParams();
  let arrayImiona;
  let arrayNazwiska;
  const arLista = [];
  useEffect(() => {
    fetch(`http://localhost:8000/turnieje/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setImieZaw(data.imie);
        setNazwiskoZaw(data.nazwisko);
      });
  }, []);

  const printContent = () => {
    let restorepage = document.body.innerHTML;
    let printcontent = document.getElementById("div1").innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
  };

  const WyswietlZaw = () => {
    setWyswietlListe("Lista startowa:");
    arrayImiona = imieZaw.split(" ");
    arrayNazwiska = nazwiskoZaw.split(" ");
    console.log(arrayNazwiska);
    console.log(arrayImiona);
    for (let i = 1; i < arrayImiona.length; i++) {
      if (i == 1) {
        arLista.push(
          <tr style={{ backgroundColor: "#377db8" }}>
            <th style={{ color: "#ddd", textAlign: "center" }}>LP</th>
            <th style={{ color: "#ddd", textAlign: "center" }}>Imię</th>
            <th style={{ color: "#ddd", textAlign: "center" }}>Nazwisko</th>
          </tr>
        );
      }
      arLista.push(
        <tr>
          <td style={{ textAlign: "center" }}>{i}</td>
          <td style={{ textAlign: "center" }}>{arrayImiona[i]}</td>
          <td style={{ textAlign: "center" }}>{arrayNazwiska[i]}</td>
        </tr>
      );
    }
    setLista(arLista);
  };

  return (
    <div>
      <br></br>
      <button onClick={WyswietlZaw}>Wyświetl Zawodników</button>
      <br></br>
      <h1>{wyswietlListe}</h1>
      <div id="div1">
        <table>{lista}</table>
      </div>
      <br></br>
      {lista && (
        <button onClick={printContent}>Wydrukuj listę zawodników</button>
      )}
    </div>
  );
};

export default WyswietlZawodnikow;
