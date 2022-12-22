import React, {useState, useEffect} from 'react';
import { InputGroup, Form, Container } from 'react-bootstrap';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemon, setPokemon] = useState([])
  const [filteredPoke, setFilteredPoke] = useState([])
  async function fetchPokemon(){
    try{
      const res = await fetch(pokeApi)
      const data = await res.json()
      setPokemon(data.results)
      setFilteredPoke(data.results)
      // console.log(data.results)
      // console.log("pokemon is",pokemon)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() =>{
    fetchPokemon()
  }, [])
  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, 'gi');
    const filtered = pokemon.filter((pkmn) => {
      console.log(pkmn.name)
      return pkmn.name.match(regex) 
    });

   
    setFilteredPoke(filtered);
  }
  return (
    <div data-testid="app">
      <Navigation />
      <div className='container-fluid'>
      <h1>Pokemon should appear here</h1>
      <InputGroup onChange={handleChange}  >
      <Form.Control
          placeholder="Search"
          aria-label="Search"
                />
      </InputGroup>
      <div className='row justify-content-md-center'>
      {filteredPoke.map((singlePokemon, idx)=>{
          return(
            <div className='col-3'>
            <PokemonCard  key={idx} url={singlePokemon.url} name={singlePokemon.name} setPokemon={setPokemon} pokemon={pokemon} filteredPoke={filteredPoke}/>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  );
}

export { App };
