import { Types } from '@/components/enums'
const config = [
  {
    name: '类型',
    propName: 'type',
    type: Types.enum,
    values: ['default', 'primary', 'outline', 'link', 'error', 'delete'],
    defaultValue: 'default'
  },
  {
    name: '形状',
    propName: 'shape',
    type: Types.enum,
    values: ['round', 'rectangle'],
    defaultValue: 'round'
  },
  {
    name: '是否禁用',
    propName: 'disabled',
    type: Types.boolean,
    defaultValue: false
  },
  {
    name: '尺寸',
    propName: 'size',
    type: Types.enum,
    values: ['small', 'middle', 'large'],
    defaultValue: 'middle'
  },
  {
    name: '边距',
    propName: 'margin',
    type: Types.string,
    defaultValue: '0'
  },
  {
    name: '内容',
    propName: '_children',
    type: Types.string
  }
]


export default config
