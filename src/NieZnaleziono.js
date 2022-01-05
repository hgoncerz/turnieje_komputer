import { Link } from "react-router-dom";

const NieZnaleziono = () => {

    return ( 
        <div className="nieznaleziono">
        <h2>Błąd</h2>
        <p>Ta strona nie została znaleziona :( </p>
        <Link to="/">Wróć do storny startowej</Link>
    </div>
     );
}
 
export default NieZnaleziono;