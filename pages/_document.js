import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from "react";
import {ProgressSpinner} from 'primereact/progressspinner';

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps};
    }

    render() {

        return (

            <Html lang="en">

                <Head>
                    <link id="theme-css" href={`/themes/vela-blue/theme.css`} rel="stylesheet"></link>
                </Head>

                <body style={{overflow: 'hidden'}}>

                <div id="globalLoader" style={{
                    position: 'fixed',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000000',
                    backgroundColor: '#17212f'
                }}>

                    <ProgressSpinner style={{width: '100px', height: '100px'}} strokeWidth="8" fill="#1f2d40"
                                     animationDuration="1s"/>

                </div>

                <Main/>
                <NextScript/>
                </body>

            </Html>

        );

    }

}

export default MyDocument;
