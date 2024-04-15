import type { PageProps } from '../../../../../types';

import PostPreview from '../../../../../components/PostsList/PostPreview';

const PostPreviewPage = async ({ params }: PageProps<{ postId: string }>) => {
  return <PostPreview postId={params.postId} />;
};

export default PostPreviewPage;
