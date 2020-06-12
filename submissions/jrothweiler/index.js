const App = function() {

    let [currentPlanet, setCurrentPlanet] = React.useState(null);
    let [tableRowData, setTableRowData] = React.useState([]);

    let ws = React.useRef(null);

    React.useEffect(() => {
        ws.current = new WebSocket('ws://localhost:4000');

        ws.current.onopen = () => console.log("Socket open");

        ws.current.onmessage = function(message) {
            setCurrentPlanet(JSON.parse(message.data).name);
        }

        return () => {
            ws.current.close(1000, "Work complete");
        }
    }, []);

    let fetchSithLordById = function(id) {
        fetch('http://localhost:3000/dark-jedis/' + id).then((response) => {
            return response.json();
        }).then((data) =>  {
            return data;
        })
    }

    React.useEffect(() => {
        let sidiousData = fetchSithLordById(3616);

        let nextMasterId = sidiousData.apprentice;

        while (nextMasterId !== null) {
            let nextMasterData = fetchSithLordById(nextMasterId);
            nextMasterId = nextMasterData.apprentice;
        }


    }, [])

    return <div class="app-container">
    <div class="css-root">
<h1 class="css-planet-monitor">Obi-Wan currently on {currentPlanet}</h1>
  
      <section class="css-scrollable-list">
        <ul class="css-slots">
          <li class="css-slot">
            <h3>Jorak Uln</h3>
            <h6>Homeworld: Korriban</h6>
          </li>
          <li class="css-slot">
            <h3>Skere Kaan</h3>
            <h6>Homeworld: Coruscant</h6>
          </li>
          <li class="css-slot">
            <h3>Na'daz</h3>
            <h6>Homeworld: Ryloth</h6>
          </li>
          <li class="css-slot">
            <h3>Kas'im</h3>
            <h6>Homeworld: Nal Hutta</h6>
          </li>
          <li class="css-slot">
            <h3>Darth Bane</h3>
            <h6>Homeworld: Apatros</h6>
          </li>
        </ul>
  
        <div class="css-scroll-buttons">
          <button class="css-button-up"></button>
          <button class="css-button-down"></button>
        </div>
      </section>
    </div>
  </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


