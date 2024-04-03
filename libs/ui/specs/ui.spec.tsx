import React from 'react';
import { render } from '@testing-library/react';

import Demo from '../src/lib/Demo';

describe('Ui', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Demo />);
    expect(baseElement).toBeTruthy();
  });
});
