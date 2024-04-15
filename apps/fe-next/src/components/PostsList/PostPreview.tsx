'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Post } from '../../types';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@nx-amplify-next/ui';

type Props = {
  post: Post | null;
  error: string | null;
};

const PostPreview = ({ post, error }: Props): JSX.Element => {
  const router = useRouter();

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
        {error && <DialogTitle className="text-red-700">{error}</DialogTitle>}
      </DialogContent>
    </Dialog>
  );
};

export default PostPreview;
