import './App.css';
import React,{useState, useEffect} from 'react';
import Basicinfo from './components/basicinfo'
import Playerstats from './components/playerstats';
import axios from 'axios'
import PlayerImage from './components/playerImage';

function App() {
  const defaultPlayer = {
    firstName: "Select player",
    lastName:"",
    position:"No Position",
    height:"No Height",
    careerRebounds: "0",
    careerTurnovers:"0",
    careerPercentageFieldGoal:"0",
    age:"0",
    weight:"0",
    careerPoints:"0",
    team:"No team",
    jerseyNumber:"No Number",
    headShotUrl:"https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg"
  }
  const [player, setPlayer] = useState(defaultPlayer);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const loadUsers = async()=>{
      var options = {
        method:'GET',
        url:'https://nba-player-individual-stats.p.rapidapi.com/players',
        headers:{
          'x-rapidapi-host': 'nba-player-individual-stats.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_API_KEY
        }
      }
      axios.request(options).then(function (response){ //this grabs all users( which are players)
        setUsers(response.data);
      });
    }
    
    loadUsers();
  }, []);

  

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length >= 2 ){
      matches = users.filter( user=>{
        const regex = new RegExp(`^${text}`,"gi"); //gi makes it so does not care about case
        
        return user.firstName != null && user.firstName.match(regex); //users that match first name;
      })
    }
    setSuggestions(matches);
    setText(text);
  }

  const onSuggestHandler = (text,id) =>{
    setText(text);
    console.log(id);
    setSuggestions([]);
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://nba-player-individual-stats.p.rapidapi.com/players/'+id,
      headers: {
        'x-rapidapi-host': 'nba-player-individual-stats.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY
      }
    };
    
   axios.request(options).then(function (response){
     console.log(response.data);
     setPlayer(response.data);
   });
   
  }


  return  ( 
    <div className="App">
      <div className="container">
        <div className="searchbar">
          <input 
          className="searchBox" 
          type="text" 
          value={text}
          onBlur={() =>{
            setTimeout(()=>{
              setSuggestions([]) //clear suggestions
            },100000);
          }}
          placeholder="Search for player" 
          onChange= { e=> onChangeHandler(e.target.value)}
          />
          <div className="test">
            {suggestions && suggestions.map((suggestion,i) =>//rendering the suggestions
            <div key={i} 
            className="suggestions"
            onClick={ () => onSuggestHandler(suggestion.firstName + " " + suggestion.lastName, suggestion.id) }>
              {suggestion.firstName} {suggestion.lastName} 
              </div> //put them into dropdown
            )}
            </div> 

        </div>
      </div>


      <div className="player-basic">
        <div className="basic-info-box">
          <Basicinfo name="Name" value={player.firstName + " " + player.lastName}/>
          <Basicinfo name="Team" value={player.team} />
          <Basicinfo name="Number" value={player.jerseyNumber} />
        </div>
        <PlayerImage url={player.headShotUrl}/>
      </div>

      <Playerstats name="Position" value={player.position}/>
      <Playerstats name="Height" value={player.height}/>
      <Playerstats name="Career Points" value={player.careerPoints}/>
      <Playerstats name="Career Percentage Field Goals" value={player.careerPercentageFieldGoal}/>
      <Playerstats name="Career Rebounds " value={player.careerRebounds}/>
      <Playerstats name="Career Turn Overs" value={player.careerTurnovers}/>
      <Playerstats name="Age" value={player.age + "yrs"}/>
      <Playerstats name="Weight" value={player.weight}/>
    </div>
  );
}

export default App;
