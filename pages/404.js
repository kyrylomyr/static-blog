import React from "react";
import Head from "next/head";

export default function Custom404() {
    return (
        <React.Fragment>
            <Head>
                <title>404 - Static Blog</title>
            </Head>
            <div>
                404 - Page Not Found
            </div>
        </React.Fragment>
    );
}
