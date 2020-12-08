import React from "react";
import Head from "next/head";
import Link from "next/link";

import PostPreviewList from "../components/post-preview-list";
import PostFilterList from "../components/post-filter-list";

import getPosts from "../lib/posts";
import getCategories from "../lib/categories";
import getTags from "../lib/tags";

export default function Index({ posts, categories, tags }) {
    return (
        <React.Fragment>
            <Head>
                <title>Static Blog</title>
                <meta name="description" content="The static blog." />
            </Head>
            <div>
                <PostPreviewList posts={posts} />
                <Link href="/posts">
                    <a>
                        All posts
                    </a>
                </Link>
                <PostFilterList categories={categories} tags={tags} />
            </div>
        </React.Fragment>
    );
}

export async function getStaticProps() {
    const posts = getPosts()
        .slice(0, 3)
        .map((post) => ({
            slug: post.slug,
            title: post.title,
            category: post.category,
            prettyDate: post.prettyDate,
            excerpt: post.excerpt,
            link: post.link
        }));

    const categories = getCategories();
    const tags = getTags();

    return {
        props: {
            posts,
            categories,
            tags
        }
    };
}
