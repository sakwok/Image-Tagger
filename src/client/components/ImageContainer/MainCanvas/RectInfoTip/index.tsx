import React, { useState, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Select from "react-dropdown-select"

import { currListSelector } from '@/redux/selector/list/index'

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

  const [displayForm, setDisplayForm] = useState(!label)
  const currLabelList = useSelector(currListSelector)
  // console.log(currLabelList)
  const dropDownoptions = currLabelList.map(label => ({ label }))
  const submitLabel = value => {
    const { label } = value[0]
    setDisplayForm(false)
    const cloneDrawnRect = [...drawnRect]
    cloneDrawnRect[index] = {
      ...drawnRect[index],
      label
    }
    // hideToolTip(index)()
    setDrawnRect(cloneDrawnRect)
  }

  // const handleEnter = e => {
  //   if (e.keyCode === 13) {
  //     submitLabel()
  //     e.preventDefault()
  //   }
  // }

  const openFormInput = () => {
    setDisplayForm(true)
  }

  const deleteRect = () => {
    const copyRect = [...drawnRect]
    copyRect.splice(index, 1)
    setDrawnRect(copyRect)
  }

  return (
    <div className="rect-info-tip-wrap">
      <ul>
        <li>X: {x.toFixed(2)} &nbsp;/&nbsp; Y: {y.toFixed(2)}</li>
        <li>Height: {height.toFixed(2)} &nbsp;/&nbsp; Width: {width.toFixed(2)}</li>
        <li>
          <span className="label-text" onClick={openFormInput} >
            label: &nbsp;
          </span>
          {
            displayForm ?
              <Fragment>
                {/* <input className="label-form"
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)} onKeyDown={handleEnter}
                /> */}
                <Select values={[]} options={dropDownoptions} onChange={submitLabel} />
                {/* <select value={inputValue} onChange={submitLabel}>
                  <option value=''>{' '}</option>
                  {currLabelList.map((label, index) => (
                    <option value={label} key={`label-${index}`}>{label}</option>
                  ))}
                </select> */}
                {/* <input
                  className="label-ok"
                  type="button"
                  value="ok"
                  onClick={submitLabel}
                /> */}
              </Fragment>
              : <span className="label-value" onClick={openFormInput} >{label}</span>
          }
        </li>
        <li className="label-delete" onClick={deleteRect} >DELETE</li>
      </ul>
      <span className="close-tip" onClick={hideToolTip(index)}>X</span>
    </div>

  )
}
