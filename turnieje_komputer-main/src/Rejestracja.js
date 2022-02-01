import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Rejestracja = () => {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [haslo, setHaslo] = useState("");
  const [elo, setElo] = useState("800");
  const [array1, setArray1] = useState();

  const historia = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/zawodnicy`)
      .then((response) => response.json())
      .then((data) => {
        setArray1(data);
      });
  }, []);

  const przyciskZarejestruj = (e) => {
    e.preventDefault();
    const zawodnik = { imie, nazwisko, haslo, elo };

    let czyJestTaki = false;
    const sprawdzenie = array1.map(function (zawodnik) {
      if (
        zawodnik.imie === imie &&
        zawodnik.nazwisko === nazwisko &&
        zawodnik.haslo === haslo
      ) {
        czyJestTaki = true;
      }
    });
    if (!czyJestTaki) {
      fetch("http://localhost:8000/zawodnicy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zawodnik),
      }).then(() => {
        console.log("dodano nowego uzytkownika");
        historia.push("/");
      });
    } else {
      console.log("Taki zawodnik już istenie");
      historia.push("/");
    }
  };
  return (
    <div className="nowyTurniej">
      <h2>Zarejestruj się</h2>
      <br></br>
      <a>Rejestracja jest wymagana do wzięcia udziału w turnieju</a>

      <form onSubmit={przyciskZarejestruj}>
        <br></br>
        <lable>Jak oceniasz swój poziom gry?</lable>
        <select
          className="select-elo"
          required
          onChange={(e) => {
            let selectElo = e.target.value;
            setElo(selectElo);
          }}
        >
          <option value="800">Początkujący</option>
          <option value="1000">zaawansowany</option>
          <option value="900">średniozaawansowany</option>
        </select>
        <br></br>
        <br></br>
        <label>Imie:</label>
        <input
          type="text"
          required
          value={imie}
          onChange={(e) => setImie(e.target.value)}
        />
        <label>Nazwisko:</label>
        <input
          type="text"
          required
          value={nazwisko}
          onChange={(e) => setNazwisko(e.target.value)}
        />
        <label>Hasło:</label>
        <input
          type="password"
          required
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />

        <button>Dodaj Zawodnika</button>
      </form>
    </div>
  );
};

export default Rejestracja;
