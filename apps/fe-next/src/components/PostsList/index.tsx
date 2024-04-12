import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '../../lib/queryClient';
import Posts from './Posts';
import { fetchPosts } from './helpers';

type Props = {
  maxLength?: number;
};

const PostsList = async ({ maxLength }: Props) => {
  noStore();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts(maxLength),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
};

export default PostsList;
