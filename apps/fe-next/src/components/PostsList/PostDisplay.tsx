'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchPostbyId } from './helpers';

type Props = {
  postId: string;
};

const PostDisplay = ({ postId }: Props): JSX.Element => {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchPostbyId(postId),
  });

  return (
    <div className="min-h-[50vh] bg-slate-200 rounded-lg p-2 mt-10">
      {post && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <h3 className=" text-lg font-semibold">{post.title}</h3>
          <p>{post.body}</p>
        </div>
      )}

      {error && <h3 className="text-red-700 text-center">{error.message}</h3>}

      {isLoading && (
        <p className="text-blue-700 text-center">loading post...</p>
      )}
    </div>
  );
};

export default PostDisplay;
