import React, { useState } from "react"
import PropTypes from "prop-types"
import MD5 from "crypto-js/md5"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import styled from "styled-components"
import CommentForm from "./CommentForm"
import moment from "moment"

const CommentBox = styled.article`
  border: 1px solid #ddd;
  margin: 25px 0 0 ${props => (props.child ? "20px" : "0")};
  .flex-container {
    display: flex;
    align-items: flex-start;
    .flex + .flex {
      margin-left: 10px;
    }
  }
  .comment-author {
    font-size: 18px;
    text-transform: uppercase;
    margin-bottom: 5px;
    font-weight: 700;
    span {
      text-transform: none;
      font-weight: 400;
      font-style: italic;
    }
  }
  border-style: none;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  padding: 20px;
`

const SingleComment = ({ comment }) => {
  const md5checksum = React.useMemo(() => {
    return MD5(comment.name)
  }, [comment.name])
  return (
    <div>
      <div className="flex-container">
        <div
          className="flex"
          style={{
            height: "50px",
            width: "50px",
          }}
        >
          <img
            src={`http://www.gravatar.com/avatar/${md5checksum}?d=identicon`}
            alt="Avatar"
          />
        </div>
        <div className="flex">
          <p className="comment-author">
            {comment.name} <span>says</span>
          </p>
          {comment.time && (
            <time>{moment(comment.time.toDate()).calendar()}</time>
          )}
        </div>
      </div>
      <p>{comment.content}</p>
    </div>
  )
}

const Comment = ({ comment, child, slug, onClickSubmit }) => {
  const [showReplyBox, setShowReplyBox] = useState(false)
  return (
    <ThemeToggler>
      {({ theme }) => {
        return (
          <CommentBox
            style={{
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <SingleComment comment={comment} />
            {child && (
              <CommentBox child className="comment-reply">
                <SingleComment comment={child} />
              </CommentBox>
            )}
            {!child && (
              <div>
                {showReplyBox ? (
                  <div>
                    <button
                      className="btn bare"
                      onClick={() => setShowReplyBox(false)}
                    >
                      Cancel Reply
                    </button>
                    <CommentForm
                      parentId={comment.id}
                      slug={slug}
                      onClickSubmit={onClickSubmit}
                    />
                  </div>
                ) : (
                  <button
                    className="btn bare"
                    onClick={() => setShowReplyBox(true)}
                  >
                    Reply
                  </button>
                )}
              </div>
            )}
          </CommentBox>
        )
      }}
    </ThemeToggler>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string,
  child: PropTypes.object,
}

export default Comment
