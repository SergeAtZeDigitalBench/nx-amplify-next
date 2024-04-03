import React from 'react';
import { render, screen } from '@testing-library/react';

import Navigation from '../src/components/Navigation';

describe('Navigation', () => {
  it('should render successfully', () => {
    render(<Navigation />);
    const element = screen.getByTestId('Navigation');
    expect(element).toBeTruthy();
  });
});
