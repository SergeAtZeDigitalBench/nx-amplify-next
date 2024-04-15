import type { PageProps } from '../../../../../types';

import { getPostById } from '../../../../../components/PostsList/helpers';
import PostPreview from '../../../../../components/PostsList/PostPreview';

const PostPreviewPage = async ({ params }: PageProps<{ postId: string }>) => {
  const [post, error] = await getPostById(params.postId);

  return <PostPreview post={post} error={error} />;
};

export default PostPreviewPage;
