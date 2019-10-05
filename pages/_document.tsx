import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {

    render() {
        return (
            <html>
                <Head>
                    <link rel='shortcut icon' href='/favicon.ico' />
                    <meta httpEquiv='x-dns-prefetch-control' content='on' />
                    <meta name='applicable-device' content='mobile' />
                    <meta content='yes' name='apple-mobile-web-app-capable' />
                    <meta content='black' name='apple-mobile-web-app-status-bar-style' />
                    <meta content='telephone=no' name='format-detection' />
                    <meta name='msapplication-tap-highlight' content='no' />
                    <link rel='stylesheet' href={`${process.env.FONT_LINK}`} />
                    <link rel='stylesheet' href={`${process.env.ICON_FONT_LINK}`} />
                    <link rel='dns-prefetch' href='//fonts.googleapis.com' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
