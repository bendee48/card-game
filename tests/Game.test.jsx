import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from '../src/components/Game';

describe('Game Component', () => {
  it('renders correct heading', () => {
    render(<Game />)

    expect(screen.getByRole('heading', { name: /super awesome/i }).textContent).toBe('Super Awesome Fun Memory Card Game')
  })

  it('displays help modal after user clicks help button', async () => {
    const user = userEvent.setup();
    render(<Game />)
    // check modal is not initially present (query doesn't throw if null)
    expect(screen.queryByRole('heading', { name: /how to play/i})).not.toBeInTheDocument();
    
    const helpBtn = screen.getByRole('img', { name: /help/i});
    await user.click(helpBtn);
    // check modal is now present
    expect(screen.getByRole('heading', { name: /how to play/i})).toBeInTheDocument();
  })
});