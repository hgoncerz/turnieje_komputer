import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Turnieje tenisowe</h1>
      </Link>
      <div className="links">
        <Link to="/nowyTurniej">Nowy turniej</Link>
        <Link to="/rejestracja">Załóż konto</Link>
        <Link to="/rozpocznijTurniej">Rozpoczte Turnieje</Link>
      </div>
    </nav>
  );
};

export default Navbar;
