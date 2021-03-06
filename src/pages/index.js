import React from "react"
import { Link, graphql } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagCapsules from "../components/TagCapsules"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(({ node }) => {
          // console.log("BlogIndex -> render -> node", node)
          const { published } = node.frontmatter
          const title = node.frontmatter.title || node.fields.slug
          if (published === "false") {
            return null
          }

          const tags = node.frontmatter.tags
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>

                <TagCapsules tags={tags} />
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            description
            published
          }
        }
      }
    }
  }
`
