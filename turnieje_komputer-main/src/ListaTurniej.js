import { Link } from "react-router-dom";
const ListaTurniej = ({ turnieje, usunTurniej }) => {
  return (
    <div className="listaTurniej">
      {turnieje.map((turniej) => (
        <div className="turnieje-wyglad" key={turniej.id}>
          <Link to={`/turnieje/${turniej.id}`}>
            <h3>Data: {turniej.data}</h3>
            <h2>Miejsce: {turniej.miejsce}</h2>
            <h2>Kontakt: {turniej.kontakt}</h2>
            <h2>Ilość maksymalna uczestników: {turniej.ile}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ListaTurniej;
