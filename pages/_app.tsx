import App, { Container } from 'next/app'
import { NextSeo } from 'next-seo'
import React from 'react'
import Head from 'next/head'
import getOrCreateStore from '@/lib/with-redux-store'
import { gioPageSet } from '@/utils'
import { Provider } from 'react-redux'
import nextCookie from 'next-cookies'
import Layout from '@/components/Layout'
import Language from '~/lang'
import '@/less/index'
import { setLanguage, setLang } from '@/redux/action/site'

const SEO_EN = {
  title: process.env.SEO_TITLE_EN,
  description: process.env.SEO_DESC_EN,
  keywords: process.env.SEO_KEYWORDS_EN
}

const SEO_CN = {
  title: process.env.SEO_TITLE_CN,
  description: process.env.SEO_DESC_CN,
  keywords: process.env.SEO_KEYWORDS_CN
}

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let language = {}
    const { query, req } = ctx
    const _cookies = nextCookie(ctx)
    const isServer = !!req
    let pageProps = {}
    let _initialReduxState = {}
    if (Component.getInitialProps) {
      const { initialReduxState, ..._pageProps } = await Component.getInitialProps(ctx)
      pageProps = {
        ..._pageProps,
        isServer
      }
      _initialReduxState = initialReduxState
    }
    const reduxStore = getOrCreateStore(_initialReduxState)
    if (isServer) {
      let lang = _cookies[`${process.env.COOKIE_LANG_KEY}`] || process.env.DEFAULT_LANG
      // const host = ctx.req.headers.host
      if (query.lang && ['zh_CN', 'en_US'].includes(query.lang)) {
        lang = query.lang
      }
      // if (query.no_header === 'true') {
      //   reduxStore.dispatch(setHideHeader())
      // }
      // if (Language[lang]) {
      //   language = Language[lang]
      // }
      language = { ...Language }
      await reduxStore.dispatch(setLang(lang))
      // await reduxStore.dispatch(changeLocaleAsync(lang))
      await reduxStore.dispatch(setLanguage(language))
    }
    ctx.reduxStore = reduxStore

    return {
      pageProps,
      initialReduxState: reduxStore.getState()
    }
  }

  reduxStore: any

  constructor(props) {
    super(props)
    this.reduxStore = getOrCreateStore(props.initialReduxState)
  }

  componentDidMount() {
    gioPageSet()
  }

  render() {
    const { Component, pageProps } = this.props
    const lang = this.reduxStore.getState().site.lang
    const seoObj = lang === 'zh_CN' ? SEO_CN : SEO_EN
    return (
      <Container>
        <NextSeo
          {...seoObj}
        />
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
          />
        </Head>
        <Provider store={this.reduxStore}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}
