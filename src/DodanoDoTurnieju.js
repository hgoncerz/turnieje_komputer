import { Link } from "react-router-dom";

const DodanoDoTurnieju = () => {

    return ( 
        <div className="dodano">
        <h1>Dodano do turnieju!</h1>
        <p>Zostałeś dodany do turnieju </p>
        <Link to="/">Wróć do storny startowej</Link>
    </div>
     );
}
 
export default DodanoDoTurnieju;