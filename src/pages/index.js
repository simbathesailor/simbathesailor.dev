/** @jsx jsx */

// import React from "react"
import { jsx, useThemeUI } from "theme-ui"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import { useResize } from "../hooks"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

// useResize()

function BlogIndex(props) {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  console.log("BlogIndex -> render -> posts", posts)
  console.log("useResize", useResize)
  // const t = React.useContext(Context)
  // console.log("BlogIndex ->  t", t)
  const v = useThemeUI()
  console.log("BlogIndex ->  v", v)

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div
        sx={{
          display: "grid",
          gridTemplateColumns: ["100%"],
          gridColumnGap: "5",
        }}
      >
        {posts.map(({ node }) => {
          const { published } = node.frontmatter
          const title = node.frontmatter.title || node.fields.slug
          if (published === "false") {
            return null
          }
          return (
            <article key={node.fields.slug}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <header
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    {node.frontmatter.featuredImage &&
                      node.frontmatter.featuredImage.publicURL && (
                        <img
                          src={node.frontmatter.featuredImage.publicURL}
                          alt=""
                        />
                      )}
                  </h3>

                  <Link
                    style={{
                      boxShadow: `none`,
                      boxShadow: "none",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                    to={node.fields.slug}
                  >
                    {title}
                  </Link>

                  <small>{node.frontmatter.date}</small>
                </header>
              </Link>
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
      </div>
    </Layout>
  )
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
            description
            published
            featuredImage {
              publicURL
            }
          }
        }
      }
    }
  }
`
