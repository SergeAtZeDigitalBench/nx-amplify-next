import { http, HttpResponse, delay } from 'msw';

import type { HttpResponseResolver } from 'msw';

import { serverWorker } from '../../../src/lib/msw/server';
import {
  fetchPets,
  fetchPetsSsr,
} from '../../../src/components/PetsList/helpers';

describe('PetsList/helpers', () => {
  const { petsResolverError } = getTestData();

  beforeAll(() => {
    serverWorker.listen();
  });
  afterEach(() => serverWorker.resetHandlers());
  afterAll(() => serverWorker.close());

  describe('fetchPets', () => {
    it('should return 3 pets on success', async () => {
      const response = await fetchPets();

      expect(response).toHaveLength(3);
    });

    it('should throw an error', async () => {
      serverWorker.use(
        http.get('https://api.example.com/pets', petsResolverError, {
          once: true,
        })
      );
      let errorMessage: null | string = null;

      try {
        await fetchPets();
      } catch (error) {
        errorMessage = error instanceof Error ? error.message : 'default error';
      }

      expect(errorMessage).toEqual('mock error message');
    });
  });

  describe('fetchPetsSsr', () => {
    it('should return tuple of [data, null] on success', async () => {
      const [data, errorMessage] = await fetchPetsSsr();

      expect(data).not.toBeNull();
      expect(errorMessage).toBeNull();
      expect(data).toHaveLength(3);
    });

    it('should return tuple of [null, errorMessage] on error', async () => {
      serverWorker.use(
        http.get('https://api.example.com/pets', petsResolverError, {
          once: true,
        })
      );

      const [data, errorMessage] = await fetchPetsSsr();

      expect(data).toBeNull();
      expect(errorMessage).not.toBeNull();
      expect(errorMessage).toEqual('mock error message');
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
