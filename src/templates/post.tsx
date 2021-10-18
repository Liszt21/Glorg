import Layout from "../layouts";
import SEO from "../components/seo";
import Content from "../components/content";

export default (props) => {
  const post = props.pageContext.post;
  return (
    <Layout>
      <SEO title={post.title} description={post.summary} keywords={post.tags} />
      <Content post={post} />
    </Layout>
  );
};
