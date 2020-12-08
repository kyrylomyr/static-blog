import React from "react";
import Head from "next/head";

import PortfolioItemPreview from "../../components/portfolio-item-preview";

import getPortfolioItems from "../../lib/portfolio";

export default function Index({ portfolioItems }) {
    return (
        <React.Fragment>
            <Head>
                <title>Portfolio - Static Blog</title>
                <meta name="description" content="Information about portfolio projects." />
            </Head>
            <div>
                {portfolioItems.map((item) => (
                    <PortfolioItemPreview key={item.slug + "_portfolioItemPreview"} portfolioItem={item} />
                ))}
            </div>
        </React.Fragment>
    );
}

export async function getStaticProps() {
    const portfolioItems = getPortfolioItems().map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        link: item.link
    }));

    return {
        props: {
            portfolioItems
        }
    };
}
