import React, { Fragment } from 'react'
import HomePage from '@/container/HomePage'

import getOrCreateStore from '@/lib/with-redux-store'

import { getAllListTypes } from '@/redux/action/list'

function IndexPage(props) {

    return (
        <Fragment>
            <HomePage {...props} />
        </Fragment>
    )
}

IndexPage.getInitialProps = async ({ req }) => {
    const reduxStore = getOrCreateStore()
    if (req) {
        const { headers: { host } } = req
        await reduxStore.dispatch(getAllListTypes(!!host))
    }
    return {
        initialReduxState: reduxStore.getState()
    }
}

export default IndexPage
