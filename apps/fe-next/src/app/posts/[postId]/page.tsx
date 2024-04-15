import { notFound } from 'next/navigation';

import type { PageProps } from '../../../types';

import { getPostById } from '../../../components/PostsList/helpers';

const PostPage = async ({ params }: PageProps<{ postId: string }>) => {
  const [post] = await getPostById(params.postId);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center my-4">
        {post.title}
      </h1>
      <p className="font-semibold text-center">{post.body}</p>
    </>
  );
};

export default PostPage;
