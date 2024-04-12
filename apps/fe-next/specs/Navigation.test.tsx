import React from 'react';

import { render, screen } from '../test-setup';
import Navigation from '../src/components/Navigation';

describe('Navigation', () => {
  it('should render successfully', () => {
    render(<Navigation />);
    const element = screen.getByTestId('Navigation');

    expect(element).toBeInTheDocument();
  });

  it('should render list', () => {
    render(<Navigation />);
    const ul = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    expect(ul).toBeInTheDocument();
    expect(listItems).toHaveLength(5);
  });

  it('should render 4 navlinks', () => {
    render(<Navigation />);
    const links = screen.getAllByRole('link');

    expect(links).toHaveLength(4);
  });

  it('should render 2 buttons', () => {
    render(<Navigation />);
    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });
});
