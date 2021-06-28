import {Form, Card, FormControl, Button} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "./App.css";


function App() {
  const [userInput, getUserInput] = useState("");
  const [queryInput, getQueryInput] = useState("");
  const [city, setCity] = useState([]);
  const [main, setMain] = useState([]);
  
  function handleChange(event){
    getUserInput(event.target.value)
  }
  function buttonCLicked(event){
    getQueryInput(userInput);

    getUserInput("");
    
    event.preventDefault();
  }
   

  const getWeatherDetails = async () =>{
    if(queryInput){
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${queryInput}&units=metric&appid=1fbcccba3233843b55d505d559707128`);
    const data = await res.json();
    setCity(data.weather);
    setMain(data.main);
    }
  }
  useEffect(() => {
    getWeatherDetails()
  }, [queryInput])
  
  return (
  <div className="App">

  <div className="header">
  <div className="container">
    <div className="row">
      <div className=""> 
      <Form className="inline mt-5 find-location">
        <FormControl type="text" placeholder="Find your Location...." name="search" className="mr-sm-2 searchbar" onChange={handleChange} value={userInput}/>
        <Button variant="outline-primary" className="searchbtn" onClick={buttonCLicked}>Find</Button>
      </Form>
      </div>
    </div>
  </div>
  </div>
  {queryInput && 
  <div className="container">
    <Card className="info_weather shadow col-4">
    <Card.Header style={{color:"grey"}}>
      Weather Information
    </Card.Header>
      <Card.Body className="card_body">
        <div className="row">
          <p style={{color: "grey"}}>{queryInput}</p>
          <div className="col-8">
          {queryInput  && <h1>{main.temp}°C</h1> }
          </div>
          <div className="col-4">
          {city.map(setIcon => <img src={`http://openweathermap.org/img/w/${setIcon.icon}.png`} ></img> )} 
          {city.map(setIcon => <p style={{color: "grey"}}>{setIcon.main}</p> )} 
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-4 ">
            <div className="row">
              <div className="col-2">
                <i class="fa fa-tint" aria-hidden="true" style={{color: "grey"}}></i>
              </div>
              <div className="col-8">
                {queryInput  && <p style={{color: "grey"}}>{main.humidity}</p> }
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-2">
                <i class="fa fa-sun" aria-hidden="true" style={{color: "grey"}}></i>
              </div>
              <div className="col-8">
                {queryInput  && <p style={{color: "grey"}}>{main.temp_max}°C</p> }
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col-2">
                <i class="fa fa-cloud" aria-hidden="true" style={{color: "grey"}}></i>
              </div>
              <div className="col-8">
                {queryInput  && <p style={{color: "grey"}}>{main.temp_min}°C</p> }
              </div>
            </div>
          </div>
        </div>
      
       
      </Card.Body>
    </Card>

  </div>}

  </div>);
}

export default App;


















