import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../src/context/CartContext';
import QuotationDrawer from '../src/components/QuotationDrawer';

function TestConsumer() {
  const { items, addItem, removeItem, itemCount, totalEstimatedPrice, openDrawer } = useCart();
  return (
    <div>
      <span data-testid="count">{itemCount}</span>
      <span data-testid="total">{totalEstimatedPrice}</span>
      <button
        onClick={() =>
          addItem({
            id: 'test-bed',
            title: 'Imperial Bed',
            wood: 'Burma Teak',
            finish: 'Natural',
            price: 150000,
          })
        }
      >
        Add Bed
      </button>
      <button onClick={() => removeItem('test-bed', 'Burma Teak', 'Natural')}>
        Remove Bed
      </button>
      <button onClick={openDrawer}>Open Drawer</button>
    </div>
  );
}

describe('CartContext and QuotationDrawer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('adds and removes items with accurate price calculation', () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');

    // Add item
    fireEvent.click(screen.getByText('Add Bed'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('total').textContent).toBe('150000');

    // Remove item
    fireEvent.click(screen.getByText('Remove Bed'));
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('total').textContent).toBe('0');
  });

  it('renders QuotationDrawer when opened', () => {
    render(
      <CartProvider>
        <TestConsumer />
        <QuotationDrawer />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Open Drawer'));
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/Consultation Tray/i)).toBeDefined();
  });
});
