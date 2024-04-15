import type { Post } from '../../types';

import { getErrorMessage } from '../../lib/common';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmpty = (obj: Record<string, any>) => {
  return Object.keys(obj).length === 0;
};

export const fetchPostbyId = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API}/posts/${id}`
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const post = (await res.json()) as Post;

  if (isEmpty(post)) {
    throw new Error(`Post "${id}" not found`);
  }

  return post;
};

export const getPostById = async (
  id: string
): Promise<[Post, null] | [null, string]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API}/posts/${id}`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const post = (await res.json()) as Post;

    if (isEmpty(post)) {
      throw new Error(`Post "${id}" not found`);
    }

    return [post, null];
  } catch (error) {
    return [null, getErrorMessage(error, `Failed fetch post by id: ${id}`)];
  }
};
