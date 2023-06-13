import logo from './logo.svg';
import './App.css';

function App() {
    let latitude;
    let longitude;

    if ("geolocation" in navigator) {
        /* местоположение доступно */
        console.log(true)
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude, position.coords.longitude);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;


        });
    } else {
        /* местоположение НЕ доступно */
        console.log(false)
        console.log(navigator.geolocation)
    }

    return (
        <div className="App">
            Geotreking

            <Geo />


        </div>
    );
}

export default App;

function Geo (){
    return <>


    </>
}
