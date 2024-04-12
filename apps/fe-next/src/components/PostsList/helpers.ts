import { Post } from '../../types';

export const fetchPosts = async (maxLength?: number): Promise<Post[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API}/posts`
  );

  if (!res.ok) {
    const errorPayload = (await res.json()) as Record<string, unknown>;
    const errMessage = Object.values(errorPayload).reduce(
      (message: string, current) => {
        if (typeof current === 'string' && !!current.trim()) {
          message = message + '. ' + current;
        }
        return message;
      },
      '' as string
    );
    throw new Error(errMessage || res.statusText);
  }

  const payload = (await res.json()) as Post[];

  return maxLength ? payload.slice(0, maxLength) : payload;
};
