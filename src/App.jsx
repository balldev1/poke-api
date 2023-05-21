import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import axios from "axios";
import Favpoke from "./components/Favpoke/Favpoke.jsx";
import ReactLoading from 'react-loading';
import React from "react";

function App() {
  const [poke, setPoke] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal
          }
        );
        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  console.log(poke);

  const prevPoke = () => {
    setNumber((number) => number - 1);
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    setFav((oldState) => [...oldState, poke]);
  };
  console.log("Pokemon ID: ", number);
  console.log("Your fav pokemonfav", fav);

  return (
    <div className="max-w-5-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
       {/* left */}

        <div>
        {loading ? 
        <ReactLoading type='spin' color='white' height={"100%"} width={"100%"} />
         :
         <>
         <h1>{poke?.name}</h1>
        <button onClick={addFav}>Addto favourite</button>
        <img src={poke?.sprites?.other.home.front_default} alt="" />
        <ul>
          {poke?.abilities?.map((abil, index) => (
            <li key={index}>{abil.ability.name}</li>
          ))}
        </ul>

        <button onClick={prevPoke}>Previous</button>
        <button onClick={nextPoke}>Next</button>
         
        </> }

        </div>
        
        

        {/* // right */}
        <div>
          <h2>Your Favourite Pokemon</h2>
          {fav.length>0 ? <Favpoke fav={fav} /> : 
          <div className="flex h-full justify-center items-center">
            <p>No favourite pokemon</p></div>}
        </div>
        </div>
    </div>
    
  );
}

export default App;
