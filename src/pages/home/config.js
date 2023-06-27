import { Form, Input, Select, Checkbox, InputNumber } from 'antd'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { Types } from '@/components/enums'

function Config(props) {
  const handleChange = (propName, type, val) => {
    if (val && typeof val === 'object' && val.target && val.constructor.name === 'SyntheticBaseEvent') {
      val = val.target.value
    }
    if (![Types.enum, Types.string, Types.number, Types.boolean].includes(type)) {
      try {
        eval(`window.tempCodeVal = ${val}`)
        val = window.tempCodeVal
      } catch (e) {
        return
      }
    }
    typeof props.onChange === 'function' && props.onChange(propName, val)
  }

  const getConfigContentByType = (data, type) => {
    let { values, propName } = data  
    if (type === Types.enum && values?.length) {
      return <Select
        key={`${propName}_${type}`}
        defaultValue={data.defaultValue}
        // style={{ width: 120 }}
        onChange={handleChange.bind(this, propName, type)}
        options={values.map(item => ({ label: item, value: item }))}
      />
    }
    if (type === Types.string) {
      return <Input key={`${propName}_${type}`} defaultValue={data.defaultValue} placeholder={`请输入${data.name}`} onChange={handleChange.bind(this, propName, type)} />
    }
    if (type === Types.boolean) {
      return <Checkbox key={`${propName}_${type}`} defaultValue={data.defaultValue} onChange={handleChange.bind(this, propName, type)}></Checkbox>
    }
    if (type === Types.number) {
      return <InputNumber key={`${propName}_${type}`} defaultValue={data.defaultValue} onChange={handleChange.bind(this, propName, type)} />
    }
    return <CodeMirror
      key={`${propName}_${type}`}
      height="200px"
      theme="dark"
      defaultValue={data.defaultValue}
      extensions={[javascript({ jsx: true }), css()]}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: true
      }}
      onChange={handleChange.bind(this, propName, type)}
    />
  }

  const getConfigContent = (data) => {
    let { type } = data
    if (!Array.isArray(type)) {
      type = [type]
    }
    return type.map(item => getConfigContentByType(data, item))
  }

  return (
    <div className="App-right">
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 330 }}
        autoComplete="off"
      >
        {
          props.data && props.data.map(item => <Form.Item key={item.propName} label={item.name}>{getConfigContent(item)}</Form.Item>)
        }
      </Form>
    </div>
  );
}

export default Config;
