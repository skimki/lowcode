import React from 'react'
const babel = require("@babel/standalone")
require("@babel/preset-env")
require("@babel/preset-react")
const babelOptions = {
  presets: ["env", "react"]
}
window.React = React

export default function Code (props) {
  let result = babel.transform(props.code, babelOptions)
  debugger
  return <div onClick={props.onClick}>
    {eval(result?.code)}
  </div>
}
