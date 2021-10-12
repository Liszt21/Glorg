import { PostList } from "../components/post";
import Layout from "../layouts";
import { fetchPosts } from "../data"

export default () => {
  const posts = fetchPosts();

  return (
    <Layout>
      <PostList posts={posts} size="large" pagination={{ pageSize: 6 }} />
    </Layout>
  );
};
