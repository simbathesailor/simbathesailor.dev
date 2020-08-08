import React from "react"
import throttle from "lodash/throttle"

export const breakPoints = {
  lg: {
    category: "lg",
    breakPoint: 1024,
  },
  md: {
    category: "md",
    breakPoint: 768,
  },
  sm: {
    category: "sm",
    breakPoint: 300,
  },
}

function getDeviceInfo(width, breakPoints) {
  const { lg, md, sm } = breakPoints
  let deviceInfo = lg
  if (width >= lg.breakPoint) {
    deviceInfo = lg
  } else if (width >= md.breakPoint) {
    deviceInfo = md
  } else {
    deviceInfo = sm
  }
  return deviceInfo
}

function useResize(getDeviceInfo, setState, breakPoints) {
  React.useEffect(() => {
    const handleResize = throttle(e => {
      // const width = window.outerWidth;
      // const deviceInfo = getDeviceInfo(width, breakPoints);
      // setState({
      // 	width,
      // 	deviceInfo,
      // 	isMobilePlatform: deviceInfo.category === 'sm',
      // });
      console.log("handleResize -> e", e.target.outerWidth)
    }, 100)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [breakPoints, getDeviceInfo, setState])
}

export default useResize
