import React from "react"
import { Link, graphql } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
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
          console.log("BlogIndex -> render -> node", node)
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

                {tags && (
                  <div
                    style={{
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <ThemeToggler>
                      {({ theme }) => {
                        console.log("BlogIndex -> render -> theme", theme)
                        return tags.split(",").map((item, index) => {
                          return (
                            <div
                              style={{
                                color:
                                  theme === "dark" || !theme ? "#000" : "#fff",
                                background:
                                  theme === "dark" || !theme ? "#fff" : "#000",
                                padding: "2px 12px",
                                display: "inline-block",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                marginRight: "5px",
                                marginBottom: "4px",
                                boxShadow:
                                  "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                                borderRadius: "5px",
                              }}
                              key={index}
                            >
                              {item}
                            </div>
                          )
                        })
                      }}
                    </ThemeToggler>
                  </div>
                )}
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
