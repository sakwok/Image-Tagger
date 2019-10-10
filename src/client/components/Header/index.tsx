import React, { useState } from 'react'
import { Dropdown, Menu, Icon, } from 'antd'
import FunDataLogo from 'static/vArenaLogo.png'
import { useDispatch } from 'react-redux'

import { setCurrentDataSet, getImages } from '@/redux/action/images'
import { UploadImagesButton } from './UploadImagesButton/index'

import './style'

const categories = [
    'Dota 2 Heroes',
    'LoL Heroes',
    'Dota 2 Events',
    'LoL Events'
]

export const Header: React.FC = () => {

    const [menuText, setMenuText] = useState('Choose Datasets')
    const dispatch = useDispatch()

    const onMenuItemClick = e => {
        const setId = Number(e.key) + 1
        setMenuText(categories[e.key])
        dispatch(setCurrentDataSet(setId))
        dispatch(getImages(false, `${setId}`, { type: setId }))
    }

    const menu = (
        <Menu>
            {
                categories.map((category, index) => (
                    <Menu.Item key={index} onClick={onMenuItemClick} >
                        <span>{category}</span>
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    return (
        <div className="header-wrap" >
            <img className="vArena-logo" src={FunDataLogo} />
            <svg className="split-line" height="30" width="2">
                <line x1="0" y1="0" x2="2" y2="30" style={{ stroke: '#d6d7d9', strokeWidth: 2 }} />
            </svg>
            <div className="header-actions">
                <li className="header-action-item">
                    <Dropdown overlay={menu} >
                        <span className="choose-data-sets">
                            {menuText} <Icon type="down" />
                        </span>
                    </Dropdown>
                </li>
                <li className="header-action-item">
                    <UploadImagesButton />
                </li>
            </div>
        </div>
    )
}
