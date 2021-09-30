import * as React from "react"
import Layout from "../layouts"
import { graphql, useStaticQuery, Link } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allOrgContent {
        nodes {
          fields {
            slug
            path
          }
          metadata {
            title
          }
        }
      }
    }
  `)
  return (
    <Layout>
      Posts:
      <ol>
        {data.allOrgContent.nodes.map((node) => {
          return (
            <li key={node.metadata.title}>
              <Link to={node.fields.path}>{node.metadata.title}</Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}
