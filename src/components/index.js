import Button from './Button'
import Text from './Text'
import Container from './Container'

const ComponentConfig = {
  // button: Button,
  // p: Text,
  button: {
    name: '按钮',
    config: Button
  },
  p: {
    name: '文本',
    config: Text
  },
  div: {
    name: '图层',
    config: Container
  }
}

export const commonProps = [
  {
    name: '样式',
    propName: 'style',
    type: 'object'
  },
  {
    name: '子元素',
    propName: 'children',
    type: 'any'
  }
]

export default ComponentConfig
