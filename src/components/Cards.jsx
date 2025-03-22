import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import  Error  from './Error.jsx';

/**
 * Cards component that fetches, displays and manages card functions.
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onUpdateScore - Function to update the score when a card is correctly clicked
 * @param {Function} props.onGameOver - Function to handle game over scenario
 * @param {Function} props.onGameWin - Function to handle game win scenario
 */
function Cards({onUpdateScore, onGameOver, onGameWin}) {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let selectedCards = useRef(new Set());

  // make the api call
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const result = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
        const json = await result.json();
        const pokeList = json.results;
        const selectedPoke = selectPokemon(pokeList);
        const detailedList = await getPokeInfo(selectedPoke);
        setCards(detailedList);
      } catch(e) {
        console.error('ooops', e)
        setError(true);
      }
      setIsLoading(false);
    }

    fetchPokemon()
  }, []);

  /**
   * Fetches detailed Pokémon information.
   * @param {Array} pokemonList - List of Pokémon objects with `name` and `url` properties.
   *                              eg { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" }
   * @returns {Promise<Array>} List of Pokémon with name and image URL.
   */
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

  /**
   * Selects a subset of Pokémon from a list.
   * @param {Array} list - Full list of Pokémon.
   * @param {number} [number=12] - Number of Pokémon to select.
   * @param {boolean} [random=false] - Whether to select randomly.
   * @returns {Array} Selected Pokémon list.
   */
  function selectPokemon(list, number=12, random=false) {
    let pokemon = [];
    const seen = {};

    if (random) {
      while (pokemon.length < number) {
        const index = Math.floor(Math.random() * list.length);
        // skip over dupe indexes
        if (seen[index]) {
          continue;
        } else {
          pokemon.push(list[index]);
          seen[index] = true;
        }
      }
    } else {
      pokemon = list.slice(0, number)
    }

    return pokemon;
  }

  /**
   * Shuffles the cards using the Fisher-Yates algorithm O(n).
   */
  function shuffle() {
    let cardsCopy = [...cards];

    for (let i = cardsCopy.length -1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
    }

    setCards(cardsCopy);
  }

  /**
   * Clears the selected cards set.
   */
  function clearSelectedCards() {
    selectedCards.current.clear();
  }

  /**
   * Handles card click events for game logic.
   * @param {Event} e - Click event.
   */
  function handleCardClick(e) {
    const poke = e.currentTarget.dataset.name;

    if (selectedCards.current.has(poke)) {
      clearSelectedCards();
      onGameOver();
    } else if (cards.length - selectedCards.current.size == 1) {
      clearSelectedCards();
      onUpdateScore();
      onGameWin();
    } else {
      selectedCards.current.add(poke);
      onUpdateScore();;
    }

    shuffle();
  }

  Cards.propTypes = {
    onUpdateScore: PropTypes.func.isRequired,
    onGameOver: PropTypes.func.isRequired,
    onGameWin: PropTypes.func.isRequired,
  }

  return (
    <>
      { isLoading ? 
        <div>
          <p>Fetching them there cards...</p>
          <svg className="loading-icon" viewBox="0 0 50 50">
            <circle className="ring" cx="25" cy="25" r="20"></circle>
            <circle className="ball" cx="25" cy="5" r="3.5"></circle>
          </svg>
        </div>
        : null
      }     
      { !error ? 
        <div className="card-grid">
          {
            cards.map(card => 
              <div 
                  key={card.name} 
                  className="card"
                  data-name={card.name}
                  onClick={handleCardClick}>
                <img src={card.url} alt={card.name} />
              </div>)
          }
        </div>
      : <Error /> }
    </>
  )
}

export default Cards;