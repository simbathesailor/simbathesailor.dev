/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import profilePic from "../assets/profile-pic.jpg"

import { rhythm } from "../utils/typography"

// avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
//   childImageSharp {
//     fixed(width: 50, height: 50) {
//       ...GatsbyImageSharpFixed
//     }
//   }
// }
const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <img
        src={profilePic}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
          height: "3.5rem",
          width: "3.5rem",
        }}
        alt=""
      />
      {/* <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      /> */}
      <div>
        <p style={{ marginBottom: 0 }}>
          Written by <strong>{author}</strong>.
        </p>
        <p style={{ marginBottom: 0 }}>
          <a href={`https://twitter.com/${social.twitter}`}>@simbatheesailor</a>
        </p>
      </div>
    </div>
  )
}

export default Bio
