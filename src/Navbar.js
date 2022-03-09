import { Link } from "react-router-dom";
const Navbar = ({ isAuth: isAuth }) => {
  if (isAuth) {
    return (
      <nav className="navbar">
        <Link to="/">
          <h1>Turnieje tenisowe</h1>
        </Link>
        <div className="links">
          <Link to="/nowyTurniej">Nowy turniej</Link>
          <Link to="/rejestracja">Załóż konto</Link>
          <Link to="/rozpocznijTurniej">Rozpoczęte turnieje</Link>
          <Link to="/rankingElo">Ranking Elo</Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <Link to="/">
          <h1>Turnieje tenisowe</h1>
        </Link>
        <div className="links">
          <Link to="/login">Logowanie admin</Link>
          <Link to="/rejestracja">Załóż konto</Link>
          <Link to="/rozpocznijTurniej">Rozpoczęte turnieje</Link>
          <Link to="/rankingElo">Ranking Elo</Link>
        </div>
      </nav>
    );
  }
};

export default Navbar;
