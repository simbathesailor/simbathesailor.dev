import React, { useState } from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import styled from "styled-components"
import PropTypes from "prop-types"

import { firestore } from "../../firebase.js"

const CommentBox = styled.div`
  input,
  textarea {
    display: block;
    background-color: #fff;
    border: 2px solid #ddd;
    font-size: 16px;
    font-weight: 400;
    padding: 10px 12px 8px;
    width: 100%;
    font-variant-numeric: lining-nums;
    font-feature-settings: "lnum";
  }
  input[type="text"] {
    width: 50%;
  }
  label {
    display: block;
    margin-bottom: 20px;
  }
`

const CommentForm = ({ parentId, slug, onClickSubmit }) => {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleCommentSubmission = async e => {
    e.preventDefault()
    let comment = {
      name: name,
      content: content,
      pId: parentId || null,
      time: new Date(),
      slug,
    }
    setName("")
    setContent("")

    await firestore
      .collection(`comments`)
      .doc()
      .set(comment)
      .catch(err => {
        console.error("error adding comment: ", err)
      })
    if (onClickSubmit) {
      onClickSubmit()
    }
  }

  const theme = localStorage.getItem("theme")

  return (
    <CommentBox
      style={{
        color: theme === "dark" ? "#fff" : "#000",
      }}
    >
      <form onSubmit={e => handleCommentSubmission(e)}>
        <label
          htmlFor="name"
          style={{
            color: theme === "dark" ? "#fff" : "#000",
          }}
        >
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="comment">
          Comment
          <textarea
            id="comment"
            onChange={e => setContent(e.target.value)}
            value={content}
            name="comment"
            required="required"
            cols="45"
            rows="6"
          ></textarea>
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </CommentBox>
  )
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  slug: PropTypes.string.isRequired,
}

export default CommentForm
