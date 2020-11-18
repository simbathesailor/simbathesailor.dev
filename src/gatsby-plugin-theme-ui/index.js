import { toTheme } from "@theme-ui/typography"
import wordpress2016 from "typography-theme-wordpress-2016"
import nightOwl from "@theme-ui/prism/presets/night-owl.json"
import merge from "lodash.merge"

const typography = toTheme(wordpress2016)

delete wordpress2016.googleFonts

export default merge(typography, {
  colors: {
    text: "#fff",

    primary: "#00adb5",

    modes: {
      dark: {
        text: "#fff",
        background: "#282c35",
      },
      light: {
        text: "#000",
        background: "#fff",
      },
    },
  },
  styles: {
    "h5 a": {
      color: "red",
    },
    img: {
      width: "100%",
    },
    root: {
      fontFamily: "Montserrat, sans-serif",
    },
    code: {
      ...nightOwl,
    },
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  sizes: [4, 8, 12, 16, 20, 24, 28, 32, 36],
  space: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68],
  breakpoints: ["40em", "56em", "64em"],
})

export const darkTheme = {
  colors: {
    // text: "#fff",
    // background: "#000",
  },
}

//dark

// -webkit-font-smoothing: antialiased;

//   --bg: #282c35;
//   --bg-secondary: rgb(54, 60, 72);
//   --header: #ffffff;
//   --textNormal: rgba(255, 255, 255, 0.88);
//   --textTitle: #ffffff;
//   --textLink: var(--siteThemeColor);
//   --hr: hsla(0, 0%, 100%, 0.2);
//   --inlineCode-bg: rgba(115, 124, 153, 0.2);
//   --inlineCode-text: #e6e6e6;
//   --form-shadow: 0 2px 15px 0 rgba(26, 26, 27, 0.637);

// light

// --bg: #ffffff;
//   --bg-secondary: rgb(249, 250, 251);
//   --header: var(--siteThemeColor);
//   --textNormal: #222;
//   --textTitle: #393e46;
//   --textLink: #00adb5;
//   --hr: hsla(0, 0%, 0%, 0.2);
//   --inlineCode-bg: rgba(255, 229, 100, 0.2);
//   --inlineCode-text: #1a1a1a;
//   --form-shadow: 0 2px 15px 0 rgba(210, 214, 220, 0.5);
