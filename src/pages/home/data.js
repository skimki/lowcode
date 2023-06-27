import { AppstoreOutlined, BuildOutlined, CodeOutlined, SettingOutlined } from '@ant-design/icons';
const iconStyle = { color: '#1890ff', fontSize: '24px' }

export const AsideData = [
  {
    icon: <BuildOutlined style={iconStyle}/>,
    text: '组件',
    key: 'Components'
  },
  {
    icon: <AppstoreOutlined style={iconStyle} />,
    text: '布局',
    key: 'Layouts'
  },
  {
    icon: <SettingOutlined style={iconStyle} />,
    text: '属性',
    key: 'Property'
  },
  {
    icon: <CodeOutlined style={iconStyle} />,
    text: '样式',
    key: 'Style'
  }
]

export const Layouts = [
  {
    type: 'div',
    name: 'DIV'
  },
  {
    type: 'Grid',
    name: '栅格'
  }
]