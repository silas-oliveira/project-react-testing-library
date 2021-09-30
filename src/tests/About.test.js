import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa da página "About"', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const tituloH2 = screen.getByRole('link', {
      name: /about/i,
    });

    expect(tituloH2).toBeInTheDocument();

    userEvent.click(tituloH2);

    const tituloAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(tituloAbout).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto "sobre a Pokédex"', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const tituloH2 = screen.getByRole('link', {
      name: /about/i,
    });

    expect(tituloH2).toBeInTheDocument();

    userEvent.click(tituloH2);

    const paragrafoUm = screen.getByText(/This application simulates a Pokédex/i);
    const paragrafoDois = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragrafoUm).toBeInTheDocument();
    expect(paragrafoDois).toBeInTheDocument();

    userEvent.click(tituloH2);
  });

  it('Testa se a página contém a imagem de uma Pokédex', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const tituloH2 = screen.getByRole('link', {
      name: /about/i,
    });

    expect(tituloH2).toBeInTheDocument();

    userEvent.click(tituloH2);

    const imagemPokedex = screen.getByRole('img');

    expect(imagemPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
