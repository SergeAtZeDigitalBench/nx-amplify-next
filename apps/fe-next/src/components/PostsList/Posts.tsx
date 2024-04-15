'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

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
          data.map(({ id, title }) => (
            <li key={id}>
              <Link
                href={`/posts/${id}`}
                className="w-full h-full min-h-[150px] rounded-lg p-2 bg-slate-200 hover:bg-slate-300 active:bg-slate-400 flex flex-col gap-1 justify-center items-center"
              >
                <h4 className="text-lg font-semibold text-center text-blue-700">
                  {title}
                </h4>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Posts;
