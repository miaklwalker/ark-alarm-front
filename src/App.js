
import './App.css';
import {useEffect, useState} from "react";

const MapContainer = (({data:[mapName,portNumber]})=>{
  return (<div className={"map-container"}>
            <input type={"text"} value={mapName}/>
            <input type={"text"} value={portNumber} />
            <button>X</button>
          </div>)
})

function ArkAlarmForm({data}){
  let maps = data.data
  return (
      <form action="">
        <label htmlFor="">
          server
          <input type="text" placeholder={data.server}/>
        </label>
        <label htmlFor="">
          ip
          <input type="text" placeholder={data.ip}/>
        </label>
        <label htmlFor="">
          game
          <input type="text" placeholder={data.game}/>
        </label>
        <label htmlFor="">
          maps
          <input type="text" placeholder={""}/>
          {Object.entries(data.maps).map((el,i)=> <MapContainer i={i} data={el}/>)}
        </label>
        <label htmlFor="">
          enemies
          <input type="text"/>
        </label>
        <label htmlFor="">
          tribemates
          <input type="text"/>
        </label>
      </form>
  )
}


function App() {
  const [clientData, setClientData] = useState(false);
  useEffect(()=>{
    let search = window.location.search.substring(1);
    let hasSessionStorage = sessionStorage.getItem(search);
    if(hasSessionStorage){
      setClientData(JSON.parse(hasSessionStorage))
    }else{
      fetch(`/${search}`)
          .then((res)=>res.json())
          .then(res=>{sessionStorage.setItem(search,JSON.stringify(res))})
          .then(()=>setClientData(JSON.parse(sessionStorage.getItem(search))))
    }

  },[])
  let cluster = clientData && Object.keys(clientData.data);


  return (
    <div className="App">
      <h1>Ark Alarm</h1>
      <h2>{clientData.name}'s config page</h2>
      {cluster && cluster.map((name,i) => <div key={i}>{name}</div>)}
      {cluster && cluster.map((name,i) => <ArkAlarmForm key={i} data={clientData.data[name]} /> )}
    </div>
  );
}

export default App;
