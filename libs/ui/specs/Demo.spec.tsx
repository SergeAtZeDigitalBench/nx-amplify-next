import React from 'react';
import { render } from '@testing-library/react';

import Demo from '../src/lib/Demo';

describe('Demo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Demo />);

    expect(baseElement).toBeTruthy();
  });
});
