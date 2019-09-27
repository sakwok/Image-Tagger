import React, { Fragment } from 'react'
import { NextSeo } from 'next-seo'

export default class extends React.Component<any, any> {

    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null
        return { statusCode }
    }

    render() {
        return (
            <Fragment>
                <NextSeo
                    title='Page is not found'
                    description='Page is not found'
                />
                <div className='page-not-found'>
                    {this.props.statusCode} | This page could not be found
                </div>
            </Fragment>
        )
    }
}
