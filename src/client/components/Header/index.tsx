import React, { useState } from 'react'
import { Dropdown, Menu, Icon, } from 'antd'
import FunDataLogo from 'static/vArenaLogo.png'

import { UploadImagesButton } from './UploadImagesButton/index'

import './style'

export const Header: React.FC = () => {

    const [menuText, setMenuText] = useState('Choose Datasets')

    const onMenuItemClick = e => {
        setMenuText(e.key)
    }

    const menu = (
        <Menu>
            <Menu.Item key="Dota 2" onClick={onMenuItemClick} >
                <span>Dota 2</span>
            </Menu.Item>
            <Menu.Item key="LoL" onClick={onMenuItemClick} >
                <span>LoL</span>
            </Menu.Item>
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
