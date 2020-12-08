import React from "react";
import Head from "next/head";

export default function About() {
    return (
        <React.Fragment>
            <Head>
                <title>About - Static Blog</title>
                <meta name="description" content="Information about blog and its author." />
            </Head>
            <div>
                About blog and its author.
            </div>
        </React.Fragment>
    );
}
