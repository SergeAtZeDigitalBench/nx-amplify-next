'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPets } from './helpers';

const PetsList = (): JSX.Element => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
  });

  return (
    <div className="p-2 bg-slate-200 rounded-lg my-4 max-w-5xl mx-auto">
      <h2 className="my-4 text-center text-xl font-semibold">Browser fetch</h2>

      <ul className=" list-disc pl-4 my-4">
        {data &&
          data.map((pet) => {
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
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PetsList;
