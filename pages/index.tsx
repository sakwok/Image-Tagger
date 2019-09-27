import React, { Fragment } from 'react'
import HomePage from '@/container/HomePage'
import getOrCreateStore from '@/lib/with-redux-store'

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
        // const { headers: { host } } = req
    }
    return {
        initialReduxState: reduxStore.getState()
    }
}

export default IndexPage
