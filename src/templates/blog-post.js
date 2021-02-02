import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { css } from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Heart from "../components/Heart"
import SEO from "../components/seo"
import TagCapsules from "../components/TagCapsules"
import { rhythm, scale } from "../utils/typography"
import Comments from "../components/Comments"
import { firestore } from "../../firebase.js"

function BlogPostTemplate(props) {
  const [comments, setComments] = React.useState([])
  const post = props.data.markdownRemark

  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext
  const slug = post.fields.slug.substring(1, post.fields.slug.length - 1)

  async function getComments() {
    const res = await firestore
      .collection(`comments`)
      .where("slug", "==", slug)
      .get()

    const arr = []
    res.forEach(doc => {
      arr.push({
        ...doc.data(),
        id: doc.id,
      })
    })
    setComments(arr)
  }
  useEffect(() => {
    getComments()
  }, [])

  const [likeData, setLikeData] = React.useState({
    isFetching: false,
    isFetched: false,
    isFailure: false,
    data: { count: 0 },
  })
  /**
   * https://firebase.google.com/docs/firestore/manage-data/add-data#node.js_1
   *
   * @return  {[type]}  [return description]
   */

  async function getLikes() {
    setLikeData({
      ...likeData,
      isFetching: true,
    })
    const res = await firestore
      .collection("likes")
      .doc(slug)
      .get()

    if (!res.exists) {
      setLikeData({
        ...likeData,
        isFetching: false,
        isFailure: false,
        isFetched: true,
        data: {
          count: 0,
        },
      })
    } else {
      const getData = res.data()

      setLikeData({
        ...likeData,
        isFetching: false,
        isFailure: true,
        isFetched: true,
        data: {
          count: getData.count,
        },
      })
    }
  }

  useEffect(() => {
    getLikes()
  }, [])

  async function likeBlog({ slug, count }) {
    const res = await firestore
      .collection("likes")
      .doc(slug)
      .set({
        count,
      })
  }

  const [isMounted, setIsMounted] = React.useState(false)
  const [isMobile, setisMobile] = React.useState(false)
  useEffect(() => {
    const isMobileCalculate =
      typeof window !== "undefined"
        ? window.matchMedia(`(max-width: 672px)`).matches
        : false
    setisMobile(isMobileCalculate)
    setIsMounted(true)
  }, [isMounted])

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        cover={post.frontmatter.cover}
      />

      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <TagCapsules tags={props.data.markdownRemark.frontmatter.tags} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
            {isMounted && likeData.isFetched && (
              <Heart
                count={likeData.data.count || 0}
                onClickHeart={() => {
                  setLikeData({
                    ...likeData,
                    data: {
                      count: likeData.data.count + 1,
                    },
                  })
                  likeBlog({
                    slug,
                    count: likeData.data.count + 1,
                  })
                }}
                stylesContainer={
                  isMobile
                    ? css`
                        position: static;
                        transform: none;
                      `
                    : ``
                }
              />
            )}
          </div>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />

        <Comments
          comments={comments}
          slug={slug}
          onClickSubmit={() => {
            getComments()
          }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        cover
      }
      fields {
        slug
      }
    }
  }
`
