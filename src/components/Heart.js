import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
 *
 * @var {[type]}
 */
const HeartContainer = styled.div`
  position: fixed;
  top: 0;
  transform: translateY(30vh);
  left: 50px;
  ${props => props.styles || ""}
`

export const LikeCount = styled.div`
  font-family: cursive;
  color: #c8204c;
  font-size: 1.25rem;
  text-align: center;
  font-weight: 900;
  position: relative;
  top: -34px;
`

const HeartMountPoint = styled.div`
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;

  cursor: pointer;

  animation: example 0.5s steps(28) forwards;

  @keyframes example {
    from {
      background-position: -0px 0;
    }
    to {
      background-position: -2800px 0;
    }
  }
`

function Heart(props) {
  const { count, onClickHeart, stylesContainer } = props
  const ref = React.useRef(null)

  return (
    <div>
      <HeartContainer className="stage" styles={stylesContainer}>
        <HeartMountPoint
          onClick={() => {
            const cssAnimation = ref.current.getAnimations()[0]
            ref.current.style.backgroundPosition = "-0px 0"
            cssAnimation.play()
            onClickHeart()
          }}
          className="heart"
          ref={ref}
        ></HeartMountPoint>
        <LikeCount>{count ? `+${count}` : "Upvote"}</LikeCount>
      </HeartContainer>
    </div>
  )
}

Heart.propTypes = {}

function useSetupHook() {
  const [count, setCount] = React.useState(0)

  return {
    count,
    setCount,
  }
}

Heart.useSetupHook = useSetupHook

export default Heart
