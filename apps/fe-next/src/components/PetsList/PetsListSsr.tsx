import { unstable_noStore as noStore } from 'next/cache';

import { fetchPetsSsr } from './helpers';

const PetsListSsr = async () => {
  noStore();

  const [pets, error] = await fetchPetsSsr();

  return (
    <div className="p-2 bg-slate-200 rounded-lg my-4 max-w-5xl mx-auto">
      <h2 className="my-4 text-center text-xl font-semibold">Server fetch</h2>

      {error && (
        <p className="text-center font-semibold text-red-700">{error}</p>
      )}

      <ul className="pl-4 my-2 list-disc">
        {pets && pets.map((current) => <li key={current}>{current}</li>)}
      </ul>
    </div>
  );
};

export default PetsListSsr;
