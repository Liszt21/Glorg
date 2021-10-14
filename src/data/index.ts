import { graphql, useStaticQuery } from "gatsby";

const fetchPosts = () => {
  return useStaticQuery(graphql`
    query {
      allOrgContent(sort: { order: DESC, fields: metadata___date }) {
        totalCount
        nodes {
          fields {
            slug
            path
          }
          metadata {
            category
            title
            date(formatString: "YYYY-MM-DD hh:mm", locale: "zh-cn")
            export_file_name
            keyword
            tags
          }
          excerpt
          html
        }
      }
    }
  `).allOrgContent.nodes.map((node) => {
    return {
      title: node.metadata.title,
      html: node.html,
      date: node.metadata.date,
      tags: node.metadata.tags,
      category: node.metadata.category,
      summary: node.excerpt,
      path: node.fields.path,
      slug: node.fields.slug,
    };
  });
};

const parseTags = (posts) => {
  const tags = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag].push(post);
      } else {
        tags[tag] = [post];
      }
    });
  });
  return tags;
};

const parseArchives = (posts) => {
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

  return { months, years };
};

const parseTree = (posts) => {
  const tree = { children: [] };

  posts.forEach((post) => {
    let current = tree;
    let key = "";
    const paths = post.slug.split("/");
    paths.forEach((path) => {
      if (path !== "") {
        let index = current.children.findIndex((item) => item.title === path);
        key += "/" + path;
        if (index === -1) {
          index = current.children.push({ title: path, key, children: [] }) - 1;
        }
        current = current.children[index];
      }
    });
    current.children.push({
      key: key + ":" + post.title,
      isLeaf: true,
      ...post,
    });
  });

  return tree.children;
};

export { fetchPosts, parseTags, parseTree, parseArchives };
