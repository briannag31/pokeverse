import React, {useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';

const LIMIT = 5;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemon, setPokemon] = useState([])
  // const [filteredPoke, setFilteredPoke] = useState([])
  async function fetchPokemon(){
    try{
      const res = await fetch(pokeApi)
      const data = await res.json()
      setPokemon(data.results)
      // setFilteredPoke(data.results)
      // console.log(data.results)
      // console.log("pokemon is",pokemon)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() =>{
    fetchPokemon()
  }, [])
  return (
    <div data-testid="app">
      <Navigation />

      <h1>Pokemon should appear here</h1>
      {pokemon.map((singlePokemon, idx)=>{
          return(
            <PokemonCard  key={idx} url={singlePokemon.url} name={singlePokemon.name} setPokemon={setPokemon} pokemon={pokemon}/>
          )
        })}
      
    </div>
  );
}

export { App };
