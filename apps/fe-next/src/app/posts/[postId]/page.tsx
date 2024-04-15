import type { PageProps } from '../../../types';

import PostDisplay from '../../../components/PostsList/PostDisplay';

const PostPage = async ({ params }: PageProps<{ postId: string }>) => {
  return <PostDisplay postId={params.postId} />;
};

export default PostPage;
