import styled from "@emotion/styled";
import Layout from "../layouts";
import { Link } from "gatsby";

const StyledLink = styled(Link)`
  color: grey;
  &:hover {
    color: #1890ff;
  }
`;
const Wrapper = styled.div``;
const Header = styled.div``;
const Content = styled.div`
  padding-bottom: 50px;
`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
`;

export default ({ post }) => {
  return (
    <Wrapper>
      <Header>
        <h1 style={{ textAlign: "center" }}>{post.title}</h1>
        <p>{post.summary}</p>
      </Header>
      <Content dangerouslySetInnerHTML={{ __html: post.html }}></Content>
      <Footer>
        {post.previous ? (
          <div>
            <span>上一篇: &nbsp;</span>
            <StyledLink to={post.previous.path}>
              {post.previous.title}
            </StyledLink>
          </div>
        ) : null}
        {post.next ? (
          <div>
            <span>下一篇: &nbsp;</span>
            <StyledLink to={post.next.path}>{post.next.title}</StyledLink>
          </div>
        ) : null}
      </Footer>
    </Wrapper>
  );
};
