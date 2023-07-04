import React from 'react'
import Code from './code'

export function convertElement (ele) {
  if (typeof ele !== 'object' || !ele) {
    return ele
  }
  let { type, props } = ele
  if (type === 'Code') {
    type = Code
  }
  // let result = { ...ele, _children: undefined }
  let children = undefined
  if (ele._children) {
    if (typeof ele._children === 'object') {
      if (Array.isArray(ele._children)) {
        children = ele._children.map((item, index) => {
          if (typeof item !== 'object') {
            return item
          }
          if (!item.props) {
            item.props = {}
          }
          item.props.key = item.key || index
          return convertElement(item)
        })
      } else {
        children = convertElement(ele._children)
      }
    } else {
      children = ele._children
    }
    return React.createElement(type, props, children);
  } else {
    return React.createElement(type, props);
  }
}
