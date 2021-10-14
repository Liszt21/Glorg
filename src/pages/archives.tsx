import Layout from "../layouts";
import { fetchPosts, parseArchives } from "../data";
import { PanelHeader, PanelContent } from "../components/panel";
import { Collapse } from "antd";

const { Panel } = Collapse;

const ArchivesPage = () => {
  const posts = fetchPosts();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const { months, years } = parseArchives(posts);

  return (
    <Layout>
      <Collapse defaultActiveKey={[currentMonth]}>
        {Object.keys(months)
          .sort((a, b) => (a < b ? -1 : 1))
          .map((month) => {
            const posts = months[month];
            return (
              <Panel
                header={
                  <PanelHeader
                    title={`${currentYear}年${month}月`}
                    count={posts.length}
                  />
                }
                key={month}
              >
                <PanelContent posts={posts} />
              </Panel>
            );
          })}
        {Object.keys(years)
          .sort((a, b) => (a < b ? -1 : 1))
          .map((year) => {
            const posts = years[year];
            return (
              <Panel
                header={
                  <PanelHeader title={`${year}年`} count={posts.length} />
                }
                key={year}
              >
                <PanelContent posts={posts} />
              </Panel>
            );
          })}
      </Collapse>
    </Layout>
  );
};

export default ArchivesPage;
