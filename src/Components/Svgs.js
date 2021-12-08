import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function ArrowRight(props) {
  return (
    <Svg
      width={17}
      height={15}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 7.725a.75.75 0 01.648-.743l.102-.007 13.184.001-4.763-4.744a.75.75 0 01.974-1.135l.084.073 6.05 6.024a.751.751 0 01.22.502l.001.03v.028l-.003.045.003-.074a.753.753 0 01-.148.447l-.006.009a.75.75 0 01-.066.075l-6.05 6.025a.75.75 0 01-1.132-.979l.073-.083 4.761-4.743H.75a.75.75 0 01-.75-.75z"
        fill="#111"
      />
    </Svg>
  )
}

export function ArrowDown(props) {
    return (
      <Svg
        width={10}
        height={6}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M.5.75L5 5.25 9.5.75"
          stroke="#FCFCFC"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }

  export function FbIcon(props) {
    return (
      <Svg
        width={9}
        height={14}
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M5.469 14V7.875h2.25l.428-2.534H5.469V3.697c0-.693.374-1.369 1.573-1.369H8.26V.171S7.155 0 6.099 0C3.893 0 2.452 1.214 2.452 3.41v1.931H0v2.534h2.452V14h3.017z"
          fill="#E2B378"
        />
      </Svg>
    )
  }
  
  
  export function GoogleIcon(props) {
    return (
      <Svg
        width={15}
        height={14}
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M7.64 6v2.4h3.97c-.16 1.03-1.2 3.018-3.97 3.018C5.25 11.418 3.3 9.441 3.3 7s1.952-4.418 4.34-4.418c1.36 0 2.27.577 2.791 1.078l1.898-1.83C11.11.692 9.53 0 7.64 0c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.041 0 6.72-2.84 6.72-6.84 0-.46-.049-.811-.11-1.16H7.64z"
          fill="#E2B378"
        />
      </Svg>
    )
  }
  
  export function ArrowLeft(props) {
    return (
      <Svg
        width={10}
        height={15}
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M8.118 1.601l-6 6 6 6"
          stroke="#FCFCFC"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }
  