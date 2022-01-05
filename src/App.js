import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import NowyTurniej from './NowyTurniej';
import TurniejeInfo from './TurniejeInfo';
import NieZnaleziono from './NieZnaleziono';
import Rejestracja from './Rejestracja';
import DodanoDoTurnieju from './DodanoDoTurnieju';
import NieDodanoDoTurnieju from './NieDodanoDoTurnieju';
import RozpocznijTurniej from './RozpocznijTurniej';

function App() {
  return (
    <Router>
      <div className="App">
       <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/nowyTurniej">
              <NowyTurniej />
            </Route>
            <Route path="/rejestracja">
                <Rejestracja/>
            </Route>
            <Route path="/turnieje/:id">
              <TurniejeInfo />
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
