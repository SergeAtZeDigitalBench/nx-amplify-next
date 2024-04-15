import { render, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { afterEach, expect } from 'vitest';

import '@testing-library/jest-dom';

import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

import { createWrapper } from './src/lib/queryClient/testUtils';

expect.extend(matchers);

/**
 * runs a cleanup after each test case (e.g. clearing jsdom)
 */
afterEach(() => {
  cleanup();
});

/* eslint-disable @typescript-eslint/no-empty-function */
const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: createWrapper(), ...options });

export * from '@testing-library/react';
export { customRender as render };
