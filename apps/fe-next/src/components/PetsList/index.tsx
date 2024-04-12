'use client';

import { useState, useEffect } from 'react';

import { getErrorMessage } from '../../lib/common';

export const fetchPetsBrowser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_TO_MOCK}/pets`);

  if (!res.ok) {
    const errorPayload = (await res.json()) as { error?: string };
    throw new Error(errorPayload.error || res.statusText);
  }

  const payload = (await res.json()) as { data: string[] };

  return payload.data;
};

const PetsList = (): JSX.Element => {
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [pets, setPets] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPets = async () => {
      try {
        setisLoading(true);
        setError(null);
        const res = await fetchPetsBrowser();
        isMounted && setPets(res);
      } catch (error) {
        isMounted && setError(getErrorMessage(error));
      } finally {
        isMounted && setisLoading(false);
      }
    };

    fetchPets();
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="p-2 bg-slate-200 rounded-lg my-4 max-w-5xl mx-auto">
      <h2 className="my-4 text-center text-xl font-semibold">Browser fetch</h2>

      <ul className=" list-disc pl-4 my-4">
        {pets.map((pet) => {
          return <li key={pet}>{pet}</li>;
        })}
      </ul>

      {isLoading && (
        <p className="text-center text-sm  my-2 font-semibold text-green-700">
          loading...
        </p>
      )}

      {error && (
        <p className="text-center text-sm my-2 font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export default PetsList;
