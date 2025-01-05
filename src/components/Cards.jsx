import { useEffect, useState } from "react";

function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('The effect has run')
    async function fetchPokemon() {
      const result = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=12')
      const json = await result.json();
      const pokeList = json.results;
      const detailedList = await getPokeInfo(pokeList);
      setCards(detailedList);
    }

    fetchPokemon()
  }, []);

  // pokemonList eg { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
  // Fetch detailed Pokémon info
  async function getPokeInfo(pokemonList) {
    const list = await Promise.all(
      pokemonList.map(async (poke) => {
        const result = await fetch(poke.url);
        const json = await result.json();
        return {
          name: json.name,
          url: json.sprites.other['official-artwork'].front_default,
        };
      })
    );

    return list; // Wait for all fetches to complete and return the data
  }


  return (
    <>
      <h1>Cards</h1>
      {cards.map(card => <div key={card.name} className="card"><img src={card.url} alt={card.name} /></div>)}
    </>
  )
}

export default Cards