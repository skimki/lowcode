import { useState, useMemo } from 'react'
import { Tree } from 'antd'

const convertTreeData = (element, id = '') => {
  if (!element) {
    return undefined
  }
  if (typeof element !== 'object') {
    return {
      title: `#text ${element}`,
      key: id
    }
  }
  if (Array.isArray(element)) {
    return element.map((item, index) => convertTreeData(item, id ? `${id}_${index}` : index.toString()))
  }
  element.key = id
  return {
      title: element._children && typeof element._children !== 'object' ? `${element.type} ${element._children}` : (element.id || element.type),
      key: id,
      children: Array.isArray(element._children) ? convertTreeData(element._children, id) : (typeof element._children === 'object' ? [convertTreeData(element._children, `${id}_0`)] : undefined)
  }
}

function DomTree(props) {
  const [data, setData] = useState([props.data])
  const treeData = useMemo(() => {
    let r = convertTreeData(data)
    console.log(r)
    return r
  }, [data])

  const onDragEnter = (info) => {
    console.log(info)
  }

  const onDrop = (info) => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
    const loop = (tempData, key, callback) => {
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i].key === key) {
          return callback(tempData[i], i, tempData)
        }
        if (tempData[i]._children) {
          loop(tempData[i]._children, key, callback)
        }
      }
    }
    const newData = [...data];

    // Find dragObject
    let dragObj
    loop(newData, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })
    if (!info.dropToGap) {
      // Drop on the content
      loop(newData, dropKey, (item) => {
        item._children = item._children || []
        // where to insert 示例添加到头部，可以是随意位置
        item._children.unshift && item._children.unshift(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 &&
      // Has children
      info.node.props.expanded &&
      // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(newData, dropKey, (item) => {
        item._children = item._children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item._children.unshift && item._children.unshift(dragObj);
        // in previous version, we use item._children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar = []
      let i
      loop(newData, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }
    setData(newData)
    console.log('on tree changed', newData[0])
    typeof props.onChange === 'function' && props.onChange({ ...newData[0] })
  }

  const onSelect = key => {
    let index = key[0].split('_')
    let target = data
    while(index.length) {
      let curIndex = index.shift()
      target = target === data ? target[curIndex] : target._children[curIndex]
    }
    typeof props.onSelect === 'function' && props.onSelect(target)
  }

  return (
    <Tree
      // showLine
      defaultExpandAll
      draggable
      blockNode
      autoExpandParent
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onSelect={onSelect}
      treeData={treeData || []}
    />
  )
}

export default DomTree
