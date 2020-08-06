module.exports = {
  siteMetadata: {
    title: `simbathesailor`,
    author: `Anil Kumar Chaudhary`,
    description: `Bits of tech and life !!`,
    siteUrl: `https://simbathesailor.dev`,
    social: {
      twitter: `simbatheesailor`,
    },
  },
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
          {
            resolve: "gatsby-remark-embed-gist",
            options: {
              // Optional:

              // the github handler whose gists are to be accessed
              username: "weirdpattern",

              // a flag indicating whether the github default gist css should be included or not
              // default: true
              includeDefaultCss: true,
            },
          },
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 400,
              wrapperStyle: `margin-bottom: 1.0725rem;display:block;margin: 0px auto;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          "gatsby-remark-autolink-headers",

          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          // {
          //   reslove: `gatsby-remark-copy-linked-files`,
          //   options: {
          //     ignoreFileExtensions: [],
          //   },
          // },

          `gatsby-remark-smartypants`,
          "gatsby-remark-embedder",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-155365064-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "A Personal blog by Anil Chaudhary",
        short_name: `simbathesailor`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#00adb5`,
        display: `minimal-ui`,
        icon: `src/assets/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [
    //       {
    //         resolve: "gatsby-remark-external-links",
    //         options: {
    //           target: "_blank",
    //         },
    //       },
    //     ],
    //   },
    // },
  ],
}
