import { Types } from '@/components/enums'
const config = [
  {
    name: '颜色',
    propName: 'color',
    type: [Types.enum, Types.string],
    values: ['green', 'red', 'blue', 'deepGrey', 'grey', 'dark', 'white'],
    defaultValue: 'dark'
  },
  {
    name: '尺寸',
    propName: 'size',
    type: Types.enum,
    values: ['mini', 'tiny', 'smaller', 'small', 'normal', 'big', 'bigger', 'max'],
    defaultValue: 'normal'
  },
  {
    name: '粗细',
    propName: 'weight',
    type: Types.string,
    defaultValue: 'normal'
  },
  {
    name: '行数',
    propName: 'rows',
    type: Types.number,
    defaultValue: 1
  },
  {
    name: '边距',
    propName: 'margin',
    type: Types.string,
    defaultValue: '0'
  },
  {
    name: '样式',
    propName: 'style',
    type: Types.object
  },
  {
    name: '内容',
    propName: '_children',
    type: Types.string
  }
]

export default config
