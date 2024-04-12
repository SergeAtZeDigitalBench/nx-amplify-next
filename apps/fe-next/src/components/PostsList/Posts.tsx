'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchPosts } from './helpers';

type Props = {
  maxLength?: number;
};

const Posts = ({ maxLength }: Props): JSX.Element => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(maxLength),
  });

  return (
    <>
      {isLoading && (
        <p className="text-center font-semibold text-orange-700">loading...</p>
      )}
      {error && (
        <p className="text-center font-semibold text-red-700">
          {error.message}
        </p>
      )}
      <ul className=" grid grid-cols-gallery gap-2">
        {data &&
          data.map(({ id, title, body }) => (
            <li
              key={id}
              className="rounded-lg p-2 bg-slate-200 flex flex-col gap-1 justify-center items-center"
            >
              <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
              <p className="text-sm">{body}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Posts;
