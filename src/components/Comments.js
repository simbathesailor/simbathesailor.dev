/**
 * This feature is developed using following article
 * https://www.smashingmagazine.com/2020/08/comment-system-firebase/#:~:text=To%20save%20a%20comment%20to,that%20in%20the%20handleCommentSubmission%20method.&text=First%2C%20we%20get%20the%20reference,and%20then%20add%20the%20comment.
 */
import React from "react"
import PropTypes from "prop-types"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import styled from "styled-components"

const CommentList = styled.div`
  article {
    margin-bottom: 20px;
  }
`

const Comments = ({ comments, slug, onClickSubmit }) => {
  return (
    <div>
      <h2>Join the discussion</h2>
      <CommentForm slug={slug} onClickSubmit={onClickSubmit} />
      <CommentList>
        {comments.length > 0 &&
          comments
            .filter(comment => !comment.pId)
            .map(comment => {
              let child
              if (comment.id) {
                child = comments.find(c => comment.id === c.pId)
              }
              return (
                <Comment
                  key={comment.id}
                  child={child}
                  comment={comment}
                  slug={slug}
                  onClickSubmit={onClickSubmit}
                />
              )
            })}
      </CommentList>
    </div>
  )
}

Comments.propTypes = {
  slug: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
}

export default Comments
