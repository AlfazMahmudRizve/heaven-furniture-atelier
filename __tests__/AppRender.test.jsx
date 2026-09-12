import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('App Smoke Test', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});
