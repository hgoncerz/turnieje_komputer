import { Link } from "react-router-dom";
const ListaRozpoczetychTurniejow = ({ rozpoczeteTurnieje, usunTurniej }) => {
  return (
    <div className="listaRozpoczetychTurniejow">
      {rozpoczeteTurnieje.map((turniej) => (
        <div className="turnieje-wyglad" key={turniej.id}>
          <Link to={`/turniejeRozpoczete/${turniej.id}`}>
            <h3>Data: {turniej.data}</h3>
            <h2>Miejsce: {turniej.miejsce}</h2>
            <h2>Grupa zaawansowania: {turniej.grupa}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaRozpoczetychTurniejow;
