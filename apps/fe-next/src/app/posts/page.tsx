import PostsList from '../../components/PostsList';

const PostsPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center my-4">Posts</h1>
      <PostsList maxLength={10} />
    </>
  );
};

export default PostsPage;
