import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

function TagCapsules({ tags }) {
  return (
    <>
      {tags && (
        <div
          style={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <ThemeToggler>
            {({ theme }) => {
              // console.log("BlogIndex -> render -> theme", theme)
              return tags.split(",").map((item, index) => {
                return (
                  <div
                    style={{
                      color: theme === "dark" || !theme ? "#000" : "#fff",
                      background: theme === "dark" || !theme ? "#fff" : "#000",
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
    </>
  )
}

TagCapsules.propTypes = {}

export default TagCapsules
