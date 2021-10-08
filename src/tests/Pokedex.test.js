import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import React from 'react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

import pokemons from '../data';
import { Pokedex } from '../components';

describe('Testa o componente "Pokedex"', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const tituloPokemon = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(tituloPokemon).toBeInTheDocument();
  });

  it(`Testa se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(buttonNextPokemon);

    const imgNextPokemon = screen.getByRole('img', {
      name: /charmander sprite/i,
    });

    expect(imgNextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const filterTypePokemon = pokemons.filter((pokemon) => pokemon.type === 'Electric');

    expect(filterTypePokemon).toHaveLength(1);
  });

  it(`O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
  se estiver no último Pokémon da lista`, () => {
    renderWithRouter(<MemoryRouter><App /></MemoryRouter>);

    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });

    userEvent.click(buttonAll);

    pokemons.reduce((acc, pokemon) => {
      const buttonNextPokemon = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      const pokemonName = screen.getByText(pokemon.name);

      const dataTestIdPokemon = screen.getByTestId(pokemon.name);

      expect(dataTestIdPokemon).toBeInTheDocument();

      acc.push(pokemon.name);

      expect(pokemonName).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);

      return acc;
    }, []);

    const firstPokemon = screen.getByText('Pikachu');

    expect(firstPokemon).toBeInTheDocument();
  });
});
