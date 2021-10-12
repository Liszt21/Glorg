import { Collapse } from "antd";
import Layout from "../layouts";
import { fetchPosts } from "../data";
import { PanelHeader, PanelContent } from "../components/panel";

const { Panel } = Collapse;

const TagsPage = () => {
  const tags = {};
  const posts = fetchPosts();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag].push(post);
      } else {
        tags[tag] = [post];
      }
    });
  });

  return (
    <Layout>
      <Collapse accordion>
        {Object.keys(tags).map((key) => {
          const posts = tags[key];
          return (
            <Panel
              header={<PanelHeader title={key} count={posts.length} />}
              key={key}
            >
              <PanelContent posts={posts} />
            </Panel>
          );
        })}
      </Collapse>
    </Layout>
  );
};

export default TagsPage;
