import { useState, useRef, useEffect } from 'react'
import { AsideData } from './data'
import ComponentConfig from '@/components'
import Config from './config'
import DomTree from './domTree'
import { convertElement } from '@/utils'
import './index.less';

function convertAsideContent (data) {
  let result = []
  for (let type in data) {
    result.push({
      type,
      ...data[type]
    })
  }
  return result
}

const ComponentList = convertAsideContent(ComponentConfig)

function App() {
  const [data, setData] = useState({ type: 'div', id: 'root', _children: [] })
  const [currentMenu, setCurrentMenu] = useState(AsideData[0].key)
  // const [targetElement, setTargetElement] = useState(null) // 被拖拽进的容器
  const [editElement, setEditElement] = useState(null) // 正在被编辑的组件
  const currentDragElement = useRef(null)

  useEffect(() => {
    // console.log('--------', data)
  }, [data])

  const preventDefault = e => {
    e.preventDefault()
  }

  const onDragStart = item => {
    currentDragElement.current = item
  }

  const onDragEnter = e => {
    console.log(e.target)
    // setTargetElement(e.target)
    e.target.classList.add('App-preview-active')
    e.preventDefault()
    e.stopPropagation()
  }

  const onDragLeave = (e) => {
    // setTargetElement(null)
    e.target.classList.remove('App-preview-active')
  }

  // 拖拽放开时，将组件放到对应区域
  const onDrop = (parent, e) => {
    e.preventDefault()
    e.stopPropagation()
    let type = currentDragElement.current.type // 组件类型
    let isContainer = ComponentConfig[type].config.find(item => item.propName === '_children' && item.type === 'any')
    let newChild = {
      type,
      props: {
        // 'data-type': type,
      },
      _children: '请输入内容'
    }
    if (!Array.isArray(parent._children)) {
      parent._children = parent._children ? [parent._children] : []
    }
    parent._children.push(newChild)
    let props = newChild.props
    props.onClick = onComponentClick.bind(this, newChild)
    if (isContainer) {
      props.onDragOver = preventDefault
      props.onDragEnter = onDragEnter
      props.onDragLeave = onDragLeave
      props.onDrop = onDrop.bind(this, newChild)
    }
    setData({...data})
    e.target.classList.remove('App-preview-active')
  }

  const onComponentClick = (element, e) => {
    if (element.type) {
      setEditElement(element)
    }
    e.stopPropagation()
  }

  const onPropsChange = (propName, val) => {
    if (propName === '_children') {
      editElement._children = val
    } else {
      editElement.props[propName] = val
    }
    setData({ ...data })
  }

  return (
    <div className="App">
      <div className="App-aside">
        {AsideData.map(item => <div key={item.text} onClick={setCurrentMenu.bind(this, item.key)}>
          {item.icon}
          <div>{item.text}</div>
        </div>)}
      </div>
      <div className="App-aside-content">
        {
          currentMenu === 'Components' && ComponentList.map(item => <div key={item.type}
            className="App-aside-component"
            draggable="true"
            onDragStart={onDragStart.bind(this, item)}
            onDragEnd={onDragLeave}>
            {item.type}
            <div>{item.name}</div>
          </div>)
        }
        {
          currentMenu === 'Layouts' && <DomTree data={data} onChange={setData} />
        }
      </div>
      <div className="App-main">
        <div
          onDragOver={preventDefault}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop.bind(this, data)}
          className="App-preview"
          // className={`App-preview${targetElement === 'iframe' ? ' App-preview-active' : ''}`}
        >
          {convertElement(data)}
        </div>
      </div>
      {editElement && <Config data={ComponentConfig[editElement.type].config} onChange={onPropsChange} />}
    </div>
  );
}

export default App;
