import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NowyTurniej from "./NowyTurniej";
import TurniejeInfo from "./TurniejeInfo";
import NieZnaleziono from "./NieZnaleziono";
import Rejestracja from "./Rejestracja";
import DodanoDoTurnieju from "./DodanoDoTurnieju";
import NieDodanoDoTurnieju from "./NieDodanoDoTurnieju";
import RozpocznijTurniej from "./RozpocznijTurniej";
import TurniejeRozpoczete from "./TurniejeRozpoczete";
import RankingElo from "./RankingElo";
import Runda from "./Runda";
import ProtectedRoute from "./ProtectedRoute";
import LoginForm from "./components/LoginForm";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const adminUser = {
    login: "admin",
    haslo: "admin",
  };

  const [user, setUser] = useState({ login: "", haslo: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (details.login == adminUser.login && details.haslo == adminUser.haslo) {
      console.log("zalogowany");
      setUser({
        login: details.login,
        haslo: details.haslo,
      });
    } else {
      console.log("złe login lub haslo");
      setError("nieprawidłowy login lub haslo");
    }
  };

  const Logout = () => {
    console.log("Logout");
    setUser({ login: "", haslo: "" });
  };

  return (
    <Router>
      <div className="App">
        {user.login != "" ? (
          <div className="welcome">
            <h2>
              Witaj, <span>{user.login}</span>
            </h2>
            <button onClick={Logout}>Wyloguj</button>
          </div>
        ) : (
          ""
        )}
        <Navbar isAuth={isAuth} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/nowyTurniej">
              <NowyTurniej />
            </Route> */}
            <ProtectedRoute
              path="/nowyTurniej"
              component={NowyTurniej}
              isAuth={isAuth}
            />
            <Route path="/login">
              <LoginForm Login={Login} error={error} />
            </Route>
            <Route path="/rejestracja">
              <Rejestracja />
            </Route>
            <Route path="/turnieje/:id">
              <TurniejeInfo isAuth={isAuth} />
            </Route>
            <Route path="/dodanoDoTurnieju">
              <DodanoDoTurnieju />
            </Route>
            <Route path="/nieDodanoDoTurnieju">
              <NieDodanoDoTurnieju />
            </Route>
            <Route path="/rozpocznijTurniej">
              <RozpocznijTurniej />
            </Route>
            <Route path="/turniejeRozpoczete/:id">
              <TurniejeRozpoczete isAuth={isAuth} />
            </Route>
            <Route path="/rankingElo">
              <RankingElo />
            </Route>
            <Route path="/runda/:id">
              <Runda isAuth={isAuth} />
            </Route>
            <Route path="*">
              <NieZnaleziono />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
