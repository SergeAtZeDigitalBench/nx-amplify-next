'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@nx-amplify-next/ui';
import { fetchPostbyId } from './helpers';

type Props = {
  postId: string;
};

const PostPreview = ({ postId }: Props): JSX.Element => {
  const router = useRouter();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: () => fetchPostbyId(postId),
  });

  const handleDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleDismiss();
    },
    [handleDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <Dialog
      open
      onOpenChange={() => {
        handleDismiss();
      }}
    >
      <DialogContent>
        {post && (
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
            <DialogDescription>{post.body}</DialogDescription>
          </DialogHeader>
        )}
        {error && (
          <DialogTitle className="text-red-700">{error.message}</DialogTitle>
        )}

        {isLoading && (
          <DialogTitle className="text-blue-700 text-center">
            loading post...
          </DialogTitle>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
