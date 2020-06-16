const App = function() {

    let [currentPlanet, setCurrentPlanet] = React.useState(null);
    let [tableRowData, setTableRowData] = React.useState([]);
    let currentUrl = React.useRef('http://localhost:3000/dark-jedis/3616')
    let currentUrlUp = React.useRef('http://localhost:3000/dark-jedis/2350')  
    let direction = React.useRef('down');
    let ws = React.useRef(null);
    let upBtnClass = currentUrlUp.current !== null ? "css-button-up" : "css-button-up css-button-disabled"
    let downBtnClass = currentUrl.current !== null ? "css-button-down" : "css-button-down css-button-disabled"
    let upBtnDisable = currentUrlUp.current === null 
    let downBtnDisable = currentUrl.current === null
    let fetchOnce = function(url) {
        return fetch(url).then((response) => {
            return response.json();
        }).then((data) =>  {
            currentUrl.current = data.apprentice.url;
            if(tableRowData[0]){
                currentUrlUp.current = tableRowData[0].master.url;
            }
            
            setTableRowData(currentRows => {
                let newRowArray = []
                //console.log(data);
                currentRows.forEach(row => {
                    newRowArray.push(row);
                })
                newRowArray.push(data);
                return newRowArray;
            })
        })
    }

    let fetchOnceUp = function(url) {
        return fetch(url).then((response) => {
            return response.json();
        }).then((data) =>  {
            currentUrlUp.current = data.master.url;
            currentUrl.current = tableRowData[tableRowData.length-1].apprentice.url;
            setTableRowData(currentRows => {
                let newRowArray = []
                console.log(data);
                currentRows.forEach(row => {
                    newRowArray.push(row);
                })
                newRowArray.unshift(data);
                return newRowArray;
            })
        })
    }

    React.useEffect(() => {
        console.log("Effect");
        if (tableRowData.length < 5 && currentUrl.current !== null&&direction.current ==='down') {
            fetchOnce(currentUrl.current)
        }else if(tableRowData.length < 5 && currentUrlUp.current !== null&&direction.current ==='up'){
            fetchOnceUp(currentUrlUp.current);
        }
    }, [tableRowData]);

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

    let handleDownScroll = () => {
        direction.current= 'down';
        setTableRowData(tableRowData.slice(2));
    };
    
    let handleUpScroll = () =>{
        direction.current= 'up';
        
        setTableRowData(tableRowData.splice(0,3));
    }
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
          <button class={upBtnClass} onClick={handleUpScroll} disabled={upBtnDisable}></button>
          <button class={downBtnClass} onClick={handleDownScroll} disabled={downBtnDisable}></button>
        </div>
      </section>
    </div>
  </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);


