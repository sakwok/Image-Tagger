import React, { Component } from 'react'
import { Link } from '~/server/routers/index'

import './style.less'

export default class extends Component<any, any> {

    render() {
        return (
            <section className='homePage'>
                <Link route='overview' params={{ playerId: 'L0GYVPP0V' }} >
                    <a>Player Example</a>
                </Link>
            </section>
        )
    }
}
