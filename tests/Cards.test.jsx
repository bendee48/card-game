import { vi, describe, it, expect } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import Cards from '../src/components/Cards';

// mock the first fetch call in fetchPokemon
// then the subsequent fetch calls in getPokeInfo 
fetch = vi.fn((url) => {
  switch (url) {
    case 'https://pokeapi.co/api/v2/pokemon/?limit=151':
      return Promise.resolve({
        json: () => { 
          return Promise.resolve({
            results: [
              {name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1"},
              {name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/2"},
            ]
        })
      }});
      break;
    case 'https://pokeapi.co/api/v2/pokemon/1':
      return Promise.resolve({
        json: () => {
          return Promise.resolve({
            name: 'Bulbasaur',
            sprites: {other: {'official-artwork': {'front_default': 'bulby.jpg'}}}
          })
        }
      })
      break;
    case 'https://pokeapi.co/api/v2/pokemon/2':
      return Promise.resolve({
        json: () => {
          return Promise.resolve({
            name: 'Charmander',
            sprites: {other: {'official-artwork': {'front_default': 'char.jpg'}}}
          })
        }
      })
      break;
  }
});

// async code: useWaitFor to load all elements in component
describe('Card Component', () => {
  it('displays pokémon cards', async () => {
    const { container } = render(<Cards />);
    
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3)) 
    screen.debug();
    expect(container).toMatchSnapshot();
  });
});

// can also use act, although most things should be wrapped in act
// but that only works for synchronous code, so use await act() for async
describe('test', ()=>{
  it('testy', async ()=> {
    await act(() => {
      render(<Cards/>)
    })
    screen.debug()

    expect(screen.getByRole('img', {name: 'Charmander'})).toBeInTheDocument()
  })
})
