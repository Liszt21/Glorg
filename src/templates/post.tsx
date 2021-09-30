import Layout from "../layouts"

export default (post) => {
  return (
    <Layout>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.pageContext.html }}
      ></div>
    </Layout>
  )
}