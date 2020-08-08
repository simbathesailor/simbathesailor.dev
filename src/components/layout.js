import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import NightIcon from "../assets/night-icon.png"
import MorningIcon from "../assets/morning-icon.png"

import { rhythm, scale } from "../utils/typography"

function ThemeChangeComponent() {
  return (
    <div>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
              style={{ marginRight: "10px" }}
            />
            <img
              style={{ height: "40px", width: "40px", margin: "0" }}
              src={theme === "dark" ? NightIcon : MorningIcon}
            />
          </label>
        )}
      </ThemeToggler>
    </div>
  )
}
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h5
          style={{
            ...scale(0.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
            textTransform: "uppercase",
            fontFamily: "Montserrat, sans-serif",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // textTransform: "none",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              // color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
          <ThemeChangeComponent />
        </h5>
      )
    } else {
      header = (
        <h4
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              // color: `inherit`,
            }}
            to={`/`}
          >
            {`${title}.DEV`}
          </Link>
          <ThemeChangeComponent />
        </h4>
      )
    }

    // margin-left: auto;
    // margin-right: auto;
    // max-width: 52rem;
    // /* padding-left: 1rem; */
    // /* padding-right: 1rem; */
    // padding: 2.625rem 1.3125rem;
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer style={{ color: "var(--header)" }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
