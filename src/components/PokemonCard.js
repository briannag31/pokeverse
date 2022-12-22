import React, {useState, useEffect} from 'react';
import {Card} from "react-bootstrap"

function PokemonCard({url, name, setPokemon}) {
  const [poke, setPoke] = useState(null)
  async function fetchOnePoke(){
    try{
      const res = await fetch(url)
      const data = await res.json()
      setPoke(data)
  
      console.log("data is: ",data)
      console.log("poke is: ",poke)
      // console.log("pokemon is",pokemon)
    } catch(err){
      console.log(err)
    }
  }
  useEffect(() =>{
    fetchOnePoke()
  }, [])
  return (
   <Card>
    <Card.Img src={poke?.sprites.front_default} alt={name} onClick={()=> console.log(poke.abilities[0].ability.name)}/>
    {/* <Card.Title>{poke?.abilities[0].ability.name}</Card.Title> */}
    
    <Card.Text>
      <ul>
      {poke?.abilities.map((abil, i) => (
        <li key={i}>{abil.ability.name}</li>
      ))}
      </ul>
    </Card.Text>
   </Card>
  );
}

export { PokemonCard };
