import React from "react";
import Link from "next/link";
import Head from "next/head";

import Markdown from "../../components/markdown";
import PostPreviewList from "../../components/post-preview-list";

import getPosts from "../../lib/posts";
import getPortfolio from "../../lib/portfolio";
import { getPostsLink } from "../../lib/links";

export default function PortfolioItem({ portfolioItem, latestRelatedPosts, relatedPostsLink }) {
    return (
        <React.Fragment>
            <Head>
                <title>{portfolioItem.title} - Static Blog</title>
                <meta name="description" content={portfolioItem.meta} />
            </Head>
            <div>
                <h1>{portfolioItem.title}</h1>
                <div>
                    <Markdown content={portfolioItem.content} />
                </div>
            </div>
            <RelatedPosts posts={latestRelatedPosts} link={relatedPostsLink} />
        </React.Fragment>
    );
}

function RelatedPosts({ posts, link }) {
    if (posts) {
        return (
            <div>
                <h2>Related posts</h2>
                <PostPreviewList posts={posts} />
                {link !== null && (
                    <Link href={link}>
                        <a>All related posts</a>
                    </Link>
                )}
            </div>
        );
    } else {
        return <></>;
    }
}

export async function getStaticProps({ params }) {
    const portfolioItem = getPortfolio().find((item) => item.slug === params.slug);

    const relatedPosts = getPosts().filter(
        (post) => post.tags.find((tag) => tag.slug === portfolioItem.slug) !== undefined
    );

    const latestRelatedPosts = relatedPosts.slice(0, 3).map((post) => ({
        title: post.title,
        category: post.category,
        prettyDate: post.prettyDate,
        excerpt: post.excerpt,
        link: post.link
    }));

    return {
        props: {
            portfolioItem,
            latestRelatedPosts: latestRelatedPosts.length > 0 ? latestRelatedPosts : null,
            relatedPostsLink: relatedPosts.length > 3 ? getPostsLink(null, portfolioItem.slug, null) : null
        }
    };
}

export async function getStaticPaths() {
    const paths = getPortfolio().map((item) => ({
        params: {
            slug: item.slug
        }
    }));

    return {
        paths,
        fallback: false
    };
}
