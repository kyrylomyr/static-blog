import React from "react";
import Head from "next/head";

import AppLogo from "../components/app-logo";
import AppNavigation from "../components/app-navigation";

import "../styles/app.less";

export default function App({ Component, pageProps }) {
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div>
                <div className="app-header">
                    <AppLogo />
                    <AppNavigation />
                </div>
                <Component {...pageProps} />
            </div>
        </React.Fragment>
    );
}
