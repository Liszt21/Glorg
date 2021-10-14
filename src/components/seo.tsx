import Helmet from "react-helmet";

const SEO = ({ title, description }) => {
  return <Helmet title={title} description={description} />;
};

export default SEO;
