import React, { useState, useEffect } from 'react'
const babel = require("@babel/standalone");
require("@babel/preset-env");
require("@babel/preset-react");
const babelOptions = {
  presets: ["env", "react"]
}
window.React = React

export default function Code (props) {
  const [content, setContent] = useState()
  useEffect(() => {
    try {
      let result = babel.transform(props.code, babelOptions)
      let content = eval(result?.code)
      setContent(content)
    } catch (e) {

    }
  }, [props.code])

  return <div onClick={props.onClick}>
    {content}
  </div>
}
