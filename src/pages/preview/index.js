import { useState, useEffect } from 'react'
import { convertElement } from '@/utils'
import './index.less';

function Preview() {
  const [data, setData] = useState(null)
  const onMessage = (e) => {
    setData(e.data)
  }

  useEffect(() => {
    window.addEventListener('message', onMessage, false)
  }, [])

  return convertElement(data);
}

export default Preview;
