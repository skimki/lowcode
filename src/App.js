import { AppstoreOutlined, BuildOutlined, CodeOutlined } from '@ant-design/icons';
import './App.less';

const iconStyle = { color: '#1890ff', fontSize: '24px' }

const AsideData = [
  {
    icon: <BuildOutlined style={iconStyle}/>,
    text: '组件'
  },
  {
    icon: <AppstoreOutlined style={iconStyle} />,
    text: '布局'
  },
  {
    icon: <CodeOutlined style={iconStyle} />,
    text: '样式'
  }
]

function App() {
  return (
    <div className="App">
      <div className="App-aside">
        {AsideData.map(item => <div key={item.text}>
          {item.icon}
          <div>{item.text}</div>
        </div>)}
      </div>
      <div className="App-aside-content"></div>
      <div className="App-main"></div>
    </div>
  );
}

export default App;
