import { Link } from "react-router-dom";

const NieDodanoDoTurnieju = () => {

    return ( 
        <div className="nie_dodano">
        <h1>Nie dodano do turnieju!</h1>
        <p>Nie udało się dodać zawodnika do turnieju, nieprawidłowe dane logowania</p>
        <Link to="/">Wróć do storny startowej</Link>
    </div>
     );
}
 
export default NieDodanoDoTurnieju;