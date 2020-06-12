const App = function() {

    let [currentPlanet, setCurrentPlanet] = React.useState(null);
    let [tableRowData, setTableRowData] = React.useState([]);
    let [firstRowData, setFirstRowData] = React.useState(null);

    let ws = React.useRef(null);

    React.useEffect(() => {
        if (firstRowData !== null ) {
            let lastRowApprentice = tableRowData[tableRowData.length - 1].apprentice;
            if (lastRowApprentice.url !== null) {

                fetchSithLordById(lastRowApprentice.url, tableRowData.slice(2))
                    .then(rows => {
                        setTableRowData(rows);
                    })
            } 
        }
        
    }, [firstRowData])

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

    let fetchSithLordById = function(url, acc) {
        return fetch(url).then((response) => {
            return response.json();
        }).then((data) =>  {
            let dataApprentice = data.apprentice;
            acc.push(data);
            setTableRowData(acc);
            if (data.apprentice.url !== null && acc.length <= 4) {
                return fetchSithLordById(dataApprentice.url, acc);
            } else {
                return acc;
            }
            
        })
    }

    let handleDownScroll = () => {
        setFirstRowData(tableRowData[2]);
    };

    React.useEffect(() => {
        fetchSithLordById('http://localhost:3000/dark-jedis/5105', []).then(rows => {
            setTableRowData(rows);
        });
    }, [])
    
    const children = tableRowData.map((data, idx) =>{
        return <li className="css-slot" key={data.name}>
                <h3>{data.name}</h3>
                <h6>Homeworld: {data.homeworld.name}</h6>
               </li>
        
    })
    return <div class="app-container">
    <div class="css-root">
<h1 class="css-planet-monitor">Obi-Wan currently on {currentPlanet}</h1>
  
      <section class="css-scrollable-list">
        <ul class="css-slots">
          {children}
        </ul>
  
        <div class="css-scroll-buttons">
          <button class="css-button-up"></button>
          <button class="css-button-down" onClick={handleDownScroll}></button>
        </div>
      </section>
    </div>
  </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


