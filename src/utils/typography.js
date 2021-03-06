import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"
import "./global.css"

Wordpress2016.overrideThemeStyles = () => {
  return {
    a: {
      color: "var(--textLink)",
    },
    figcaption: {
      color: "var(--textLink)",
    },
    hr: {
      background: "var(--hr)",
    },
    "h2,h3,h4": {
      fontFamily: "inherit",
      fontWeight: 800,
      color: "var(--header)",
    },
    "a.gatsby-resp-image-link": {
      boxShadow: "none",
    },
    // These two are for gatsby-remark-autolink-headers:
    "a.anchor": {
      boxShadow: "none",
    },
    'a.anchor svg[aria-hidden="true"]': {
      stroke: "var(--textLink)",
    },
    "p code": {
      fontSize: "1rem",
      color: "var(--header)",
      background: "none",
    },
    "p img": {
      margin: "0px auto",
      display: "block",
    },

    // TODO: why tho
    "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
      fontSize: "inherit",
      fontFamily: "inherit",
    },
    "li code": {
      fontSize: "1rem",
    },
    blockquote: {
      color: "var(--siteThemeColor)",
      borderLeftColor: "inherit",
      opacity: "0.8",
    },
    "blockquote.translation": {
      fontSize: "1em",
    },
    p: {
      color: "var(--textNormal)",
    },
    "header small": {
      color: "var(--textNormal)",
    },
    "h4 a": {
      color: "var(--header)",
    },
    "header h1": {
      color: "var(--header)",
    },
    ol: {
      color: "var(--textNormal)",
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
