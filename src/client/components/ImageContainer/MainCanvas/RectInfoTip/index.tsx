import React, { useState, } from 'react'

import './style'

interface RectInfoTipProps {
  x: number
  y: number
  height: number
  width: number
  label: string
  setDrawnRect: any
  index: number
  drawnRect: DrawnRect[]
  hideToolTip: any
}

export const RectInfoTip: React.FC<RectInfoTipProps> = ({ x, y, height, width, label, setDrawnRect, index, drawnRect, hideToolTip }) => {

  const [inputValue, setInputValue] = useState(label)
  const [displayForm, setDisplayForm] = useState(!label)

  const handleEnter = e => {
    if (e.keyCode === 13) {
      setDisplayForm(false)
      const cloneDrawnRect = [...drawnRect]
      cloneDrawnRect[index] = {
        ...drawnRect[index],
        label: inputValue
      }
      setDrawnRect(cloneDrawnRect)
      e.preventDefault()
    }
  }

  const openFormInput = () => {
    setDisplayForm(true)
  }

  return (
    <div className="rect-info-tip-wrap">
      <ul>
        <li>X: {x} &nbsp;/&nbsp; Y: {y}</li>
        <li>Height: {height} &nbsp;/&nbsp; Width: {width}</li>
        <li>
          <span className="label-text" onClick={openFormInput} >
            label: &nbsp;
          </span>
          {
            displayForm ?
              <input className="label-form"
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} onKeyDown={handleEnter}
              />
              : <span className="label-value" onClick={openFormInput} >{label}</span>
          }
        </li>
      </ul>
      <span className="close-tip" onClick={hideToolTip(index)}>X</span>
    </div>

  )
}
