import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  console.log(search)
  console.log(data);

  function ListItems(props) {
    return (
      <>
        <img src={props.avatar} alt={props.first_name}></img>
        <p>{props.first_name}</p>
        <span>{props.id}</span>
      </>
    )
  }

  async function pullJson() {
    const reponse = await fetch('https://reqres.in/api/users?page=1')
    const responseData = await reponse.json()
    setData(responseData.data)   
  }

  useEffect(() => {
    pullJson()
  }, [])
  
  if (data == null) {
    return (
      <div className="App">
        <div className="search_container">
          <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='list_container'>
            
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="search_container">
        <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className='list_container'>
            {data.filter((mappedObject, index) => {return (
              search.toLowerCase() === '' ? mappedObject : mappedObject.first_name.toLowerCase().includes(search.toLowerCase())
            )}).map((mappedObject, index) => {
                return (
                  <div className='items_container' key={index}>
                    <ListItems avatar = {mappedObject.avatar} first_name = {mappedObject.first_name} id = {mappedObject.id}></ListItems>
                  </div>
                )
              })
            }
        </div>
      </div>
    );
  }
 
}

export default App;
