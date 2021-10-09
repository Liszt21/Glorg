import { graphql, useStaticQuery } from "gatsby";
import { Collapse } from "antd";
import Layout from "../layouts";
import { PanelHeader, PanelContent } from "../components/panel";

const { Panel } = Collapse;

const ArchivesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allOrgContent(sort: { order: DESC, fields: metadata___date }) {
        totalCount
        nodes {
          fields {
            slug
            path
          }
          metadata {
            summary
            category
            title
            date(formatString: "YYYY-MM-DD")
            export_file_name
            keyword
            tags
          }
          excerpt
          html
        }
      }
    }
  `);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const months = {};
  const years = {};

  data.allOrgContent.nodes.map((node) => {
    const date = new Date(node.metadata.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (year > currentYear && month > currentMonth) {
      console.log("Invalid date");
      return;
    }

    if (year === currentYear) {
      if (month <= currentMonth) {
        if (months[month]) {
          months[month].push(node);
        } else {
          months[month] = [node];
        }
      } else {
        console.log("Invalid month");
      }
    } else {
      if (years[year]) {
        years[year].push(node);
      } else {
        years[year] = [node];
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
                <PanelContent
                  posts={posts.map((post) => {
                    return {
                      title: post.metadata.title,
                      summary: post.metadata.summary,
                      path: post.fields.path
                    };
                  })}
                />
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
                <PanelContent
                  posts={posts.map((post) => {
                    return {
                      title: post.metadata.title,
                      summary: post.metadata.summary,
                      path: post.fields.path
                    };
                  })}
                />
              </Panel>
            );
          })}
      </Collapse>
    </Layout>
  );
};

export default ArchivesPage;
