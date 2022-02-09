import { useState } from "react";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

const NowyTurniej = () => {
  const [data, setData] = useState("");
  const [miejsce, setMiejsce] = useState("");
  const [kontakt, setKontakt] = useState("");
  const [ile, setIle] = useState("8");
  const [grupa, setGrupa] = useState("900");
  const [opis_turnieju, setOpis_turnieju] = useState("");
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const historia = useHistory();

  const przyciskFormularza = (e) => {
    e.preventDefault();
    const turniej = {
      data,
      miejsce,
      kontakt,
      ile,
      grupa,
      opis_turnieju,
      imie,
      nazwisko,
    };

    fetch("http://localhost:8000/turnieje", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turniej),
    }).then(() => {
      console.log("dodano nowy turniej");
      historia.push("/");
    });
  };
  return (
    <div className="nowyTurniej">
      <h2>Dodaj nowy turniej</h2>
      <form onSubmit={przyciskFormularza}>
        <label>Turniej data:</label>
        <input
          type="text"
          required
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <label>Turniej miejsce:</label>
        <textarea
          required
          value={miejsce}
          onChange={(e) => setMiejsce(e.target.value)}
        ></textarea>
        <label>Grupa:</label>
        <input
          type="text"
          required
          value={grupa}
          onChange={(e) => setGrupa(e.target.value)}
        />
        <label>Turniej kontakt:</label>
        <textarea
          required
          value={kontakt}
          onChange={(e) => setKontakt(e.target.value)}
        ></textarea>
        <label>Turniej maksymalna liczba uczestników:</label>
        <input
          type="text"
          required
          value={ile}
          onChange={(e) => setIle(e.target.value)}
        />
        <label>Opis Turnieju:</label>
        <textarea
          required
          value={opis_turnieju}
          onChange={(e) => setOpis_turnieju(e.target.value)}
        ></textarea>

        <button>Dodaj turniej</button>
      </form>
    </div>
  );
};

export default withRouter(NowyTurniej);
