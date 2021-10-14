import Layout from "../layouts";
import SEO from "../components/seo";

export default (props) => {
  const post = props.pageContext;
  return (
    <Layout>
      <SEO title={post.title} description={post.summary} />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
    </Layout>
  );
};
