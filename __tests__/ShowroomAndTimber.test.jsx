import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Showroom from '../src/components/Showroom';
import TimberLensModal from '../src/components/TimberLensModal';
import { CartProvider } from '../src/context/CartContext';

describe('Showroom Component', () => {
  it('renders section 08 heading, address, hours and map iframe', () => {
    render(<Showroom />);
    expect(screen.getByText(/08 \/ THE ATELIER/i)).toBeDefined();
    expect(screen.getByText(/Experience Tactile Materiality/i)).toBeDefined();
    expect(screen.getAllByText(/Agrabad Access Road/i).length).toBeGreaterThan(0);
    expect(screen.getByTitle(/Haven Atelier Flagship Location/i)).toBeDefined();
    expect(screen.getByText(/Book VIP Private Walkthrough/i)).toBeDefined();
  });
});

describe('TimberLensModal Component', () => {
  it('renders timber species tabs and switches info on click', () => {
    render(
      <CartProvider>
        <TimberLensModal isOpen={true} onClose={() => {}} />
      </CartProvider>
    );

    expect(screen.getByText(/Macro Timber Lens/i)).toBeDefined();
    expect(screen.getAllByText(/Burma Teak/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Chittagong Gamari/i).length).toBeGreaterThan(0);

    // Click Gamari tab
    const gamariBtn = screen.getAllByText(/Chittagong Gamari/i)[0];
    fireEvent.click(gamariBtn);
    expect(screen.getByText(/prized indigenous timber/i)).toBeDefined();
  });
});
