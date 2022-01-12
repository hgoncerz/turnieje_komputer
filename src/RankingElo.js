import useFetch from "./useFetch";
import ListaElo from "./ListaElo";
const RankingElo = () => {
  const {
    dane: elo,
    czekanieNaSerwer,
    blad,
  } = useFetch("http://localhost:8000/zawodnicy");
  return (
    <div className="rankingElo">
      {czekanieNaSerwer && <div>Ładowanie...</div>}
      {blad && <div>{blad}</div>}
      {elo && <ListaElo elo={elo} />}
    </div>
  );
};

export default RankingElo;
