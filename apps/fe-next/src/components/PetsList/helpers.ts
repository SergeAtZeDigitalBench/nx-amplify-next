import { getErrorMessage } from '../../lib/common';

export const fetchPets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_TO_MOCK}/pets`);

  if (!res.ok) {
    const errorPayload = (await res.json()) as { error?: string };
    throw new Error(errorPayload.error || res.statusText);
  }

  const payload = (await res.json()) as { data: string[] };

  return payload.data;
};

export const fetchPetsSsr = async (): Promise<
  [string[], null] | [null, string]
> => {
  try {
    const payload = await fetchPets();

    return [payload, null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};
