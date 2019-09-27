import React from 'react'
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
}

interface IconInterFace extends Props {
  type: string
}

export default ({
  fontFamily = 'dota',
  prefixCls = 'dota',
  className = '',
  style = {},
  onClick = noop,
  type,
  children
}: IconInterFace): JSX.Element => (
    type ? <i
      style={style}
      onClick={onClick}
      className={classnames(fontFamily, `${prefixCls}-${type}`, className)}
    >
      {children}
    </i> : null
  )
