import ListaTurniej from './ListaTurniej';
import useFetch from './useFetch';

const Home = () => {
    const {dane: turnieje, czekanieNaSerwer,blad} = useFetch('http://localhost:8000/turnieje');
 

    return ( 
        <div className="home">
            { blad && <div>{blad}</div>}
            { czekanieNaSerwer && <div>Wczytywanie...</div>}
          {turnieje && <ListaTurniej turnieje={turnieje}/>}
        </div>
     );
}
 
export default Home;