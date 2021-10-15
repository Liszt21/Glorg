import Layout from "../layouts";
import SEO from "../components/seo";
import { Descriptions } from "antd";

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="GLorg : About" />
      <Descriptions title="About me" bordered column={1}>
        <Descriptions.Item label="Name">Liszt21</Descriptions.Item>
        <Descriptions.Item label="Major">Computer Science</Descriptions.Item>
        <Descriptions.Item label="Location">Shanghai</Descriptions.Item>
        <Descriptions.Item label="Github">
          <img
            src="https://github-readme-stats.vercel.app/api?username=Liszt21&show_icons=true&include_all_commits=true&theme=buefy&hide_border=true"
            alt="Liszt21's github stats"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Language">
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=Liszt21&layout=compact&theme=buefy&hide_border=true"
            alt="Liszt21's top langs"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Projects">
          <a href="http://github.com/Liszt21/Glorg">Glorg</a>
          <br />
          <a href="http://github.com/Liszt21/Aliya">Aliya</a>
          <br />
          <a href="http://github.com/Liszt21/Eliya">Eliya</a>
          <br />
          <a href="http://github.com/Liszt21/Sliya">Sliya</a>
          <br />
          <a href="http://github.com/Liszt21/Clish">Clish</a>
        </Descriptions.Item>
      </Descriptions>
    </Layout>
  );
};

export default AboutPage;
