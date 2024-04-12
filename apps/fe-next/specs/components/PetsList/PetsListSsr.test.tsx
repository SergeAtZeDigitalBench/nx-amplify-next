import { http, HttpResponse, delay } from 'msw';

import type { HttpResponseResolver } from 'msw';

import { serverWorker } from '../../../src/lib/msw/server';
import { render, screen, waitFor } from '../../../test-setup';
import PetsListSsr from '../../../src/components/PetsList/PetsListSsr';

describe('PetsListSsr RSC', () => {
  const { petsResolverError } = getTestData();

  beforeAll(() => {
    serverWorker.listen();
  });
  afterEach(() => serverWorker.resetHandlers());
  afterAll(() => serverWorker.close());

  it('should render the component', async () => {
    const { baseElement } = render(await PetsListSsr());

    expect(baseElement).toBeInTheDocument();
  });

  it('should display list on success', async () => {
    render(await PetsListSsr());

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  it('should display error on failure response', async () => {
    serverWorker.use(
      http.get('https://api.example.com/pets', petsResolverError, {
        once: true,
      })
    );

    render(await PetsListSsr());

    await waitFor(() => {
      const message = screen.getByText(/mock error message/i);
      expect(message).toBeInTheDocument();
    });
  });
});

function getTestData() {
  const petsResolverError: HttpResponseResolver = async () => {
    await delay(500);
    return HttpResponse.json({ error: 'mock error message' }, { status: 400 });
  };

  return {
    petsResolverError,
  };
}
