import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { noop } from '@/utils'

export interface Props {
  fontFamily?: string
  prefixCls?: string
  className?: string
  style?: object
  onClick?: () => void
  children?: JSX.Element
  key?: any
  dataTip?: boolean
  dataFor?: string
  dataEvent?: string
}

interface IconInterFace extends Props {
  type: string
}

export default forwardRef(({
  fontFamily = 'label',
  prefixCls = 'label',
  className = '',
  style = {},
  onClick = noop,
  type,
  children,
  dataTip,
  dataFor,
  dataEvent
}: IconInterFace,          ref: any): JSX.Element => {
  const icon = (type ? <i
    style={style}
    onClick={onClick}
    className={classnames(fontFamily, `${prefixCls}-${type}`, className)}
    data-tip={dataTip}
    data-for={dataFor}
    data-event={dataEvent}
    ref={ref}
  >
    {children}
  </i> : null
  )
  return icon
})
