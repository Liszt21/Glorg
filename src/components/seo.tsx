import Helmet from "react-helmet";

const SEO = ({ title, description, keywords = [] }) => {
  return (
    <Helmet
      title={title}
      description={description}
      meta={[
        { name: "og:title", content: title },
        { name: "og:description", content: description },
        { name: "og:type", content: "website" },
      ].concat([{ name: "keywords", content: keywords.join(", ") }])}
    />
  );
};

export default SEO;
