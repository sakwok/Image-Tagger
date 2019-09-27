import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import i18n from '@/utils/i18n'
import moment from 'moment'

interface LayoutProps {
    site: SiteInitialState
}

@(connect(({ site }: ReduxInitialState) => ({
    site
})) as any)
export default class extends Component<LayoutProps, any> {

    constructor(props) {
        super(props)
        const { lang, momentLocale } = this.props.site
        i18n.init(this.props.site.language[lang])
        moment.locale(momentLocale)
    }

    componentDidUpdate(prevProps) {
        if (this.props.site.momentLocale !== prevProps.site.momentLocale) {
            moment.locale(this.props.site.momentLocale)
        }
    }

    render() {
        return (
            <Fragment>
                <Header title='Header' style={{ textAlign: 'center', lineHeight: 3 }} />
                <section id='Container'>
                    {this.props.children}
                </section>
                <Footer title='Footer' style={{ textAlign: 'center', lineHeight: 3 }} />
            </Fragment>
        )
    }

}
