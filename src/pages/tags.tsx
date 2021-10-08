import * as React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Layout from "../layouts"
import { Tag } from 'antd';

const TagsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allOrgContent(sort: {order: DESC, fields: metadata___date}) {
        totalCount
        nodes  {
          fields {
            path
          }
          metadata {
            title
            tags
          }
        }
      }
    }
  `)
  
  const tags = {}

  data.allOrgContent.nodes.forEach(node => {
    node.metadata.tags.forEach(tag => {
      if(tags[tag]) {
        tags[tag].push({title: node.title, path: node.path})
      }else{
        tags[tag] = [{title: node.title, path: node.path}]
      }
    })
  })

  return (
    <Layout>
      <div style={{display: 'flex', flexFlow:"row wrap", justifyContent: 'center', width: "81%", margin: "auto"}}>
        {Object.keys(tags).map(key => {return (<div style={{cursor:"pointer",margin: ".3rem"}}><Tag>{key}</Tag></div>)})}
      </div>
    </Layout>
  )
}

export default TagsPage;