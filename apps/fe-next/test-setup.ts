import { render } from '@testing-library/react';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { createWrapper } from './src/lib/queryClient/testUtils';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: createWrapper(), ...options });

export * from '@testing-library/react';
export { customRender as render };
