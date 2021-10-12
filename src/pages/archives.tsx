import { Collapse } from "antd";
import Layout from "../layouts";
import { fetchPosts } from "../data";
import { PanelHeader, PanelContent } from "../components/panel";

const { Panel } = Collapse;

const ArchivesPage = () => {
  const posts = fetchPosts();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const months = {};
  const years = {};

  posts.map((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (year > currentYear && month > currentMonth) {
      console.log("Invalid date");
      return;
    }

    if (year === currentYear) {
      if (month <= currentMonth) {
        if (months[month]) {
          months[month].push(post);
        } else {
          months[month] = [post];
        }
      } else {
        console.log("Invalid month");
      }
    } else {
      if (years[year]) {
        years[year].push(post);
      } else {
        years[year] = [post];
      }
    }
  });

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
