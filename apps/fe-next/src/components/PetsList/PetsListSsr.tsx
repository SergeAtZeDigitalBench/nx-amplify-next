import { unstable_noStore as noStore } from 'next/cache';

import { getErrorMessage } from '../../lib/common';

export const fetchPetsSsr = async (): Promise<
  [string[], null] | [null, string]
> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_TO_MOCK}/pets`);

    if (!res.ok) {
      const errorPayload = (await res.json()) as { error?: string };
      throw new Error(errorPayload.error || res.statusText);
    }

    const payload = (await res.json()) as { data: string[] };

    return [payload.data, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

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
