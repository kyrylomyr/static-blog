import React from "react";
import Head from "next/head";
import Link from "next/link";

import PostPreviewList from "../components/post-preview-list";
import PostFilterList from "../components/post-filter-list";

import getPosts from "../lib/posts";
import getCategories from "../lib/categories";
import getTags from "../lib/tags";
import { getPagesCount, getPostsForPage } from "../lib/pagination";
import { getPostsLink } from "../lib/links";

export default function Posts({ pageTitle, posts, olderPostsLink, newerPostsLink, categories, tags }) {
    return (
        <React.Fragment>
            <Head>
                <title>{pageTitle} - Static Blog</title>
                <meta name="description" content={`Archive of all blog posts. ${pageTitle}.`} />
            </Head>
            <div>
                <PostPreviewList posts={posts} />
                {newerPostsLink !== null && (
                    <div>
                        <Link href={newerPostsLink}>
                            <a>Newer posts</a>
                        </Link>
                    </div>
                )}

                {olderPostsLink !== null && (
                    <div>
                        <Link href={olderPostsLink}>
                            <a>Older posts</a>
                        </Link>
                    </div>
                )}
                <PostFilterList categories={categories} tags={tags} />
            </div>
        </React.Fragment>
    );
}

export async function getStaticProps({ params }) {
    let posts = getPosts();

    let categorySlug = null;
    let tagSlug = null;
    let page = 1;

    let pageTitle = "All posts";

    if (params.postsParams.length === 2) {
        page = parseInt(params.postsParams[1]);
    } else if (params.postsParams.length >= 3) {
        if (params.postsParams[1] === "category") {
            categorySlug = params.postsParams[2];
            posts = posts.filter((post) => post.category.slug === categorySlug);
            pageTitle = `Posts in ${categorySlug} category`;
        } else if (params.postsParams[1] === "tag") {
            tagSlug = params.postsParams[2];
            posts = posts.filter((post) => post.tags.find((tag) => tag.slug === tagSlug) !== undefined);
            pageTitle = `Posts with tag ${tagSlug}`;
        }

        if (params.postsParams.length === 4) {
            page = parseInt(params.postsParams[3]);
        }
    }

    if (page > 1) {
        pageTitle = `${pageTitle} - Page ${page}`;
    }

    const pagesCount = getPagesCount(posts);
    const pagePosts = getPostsForPage(posts, page).map((post) => ({
        slug: post.slug,
        title: post.title,
        category: post.category,
        prettyDate: post.prettyDate,
        excerpt: post.excerpt,
        link: post.link
    }));

    const olderPostsLink = page < pagesCount ? getPostsLink(categorySlug, tagSlug, page + 1) : null;
    const newerPostsLink = page > 1 ? getPostsLink(categorySlug, tagSlug, page - 1) : null;

    const categories = getCategories();
    const tags = getTags();

    return {
        props: {
            pageTitle,
            posts: pagePosts,
            olderPostsLink,
            newerPostsLink,
            categories,
            tags
        }
    };
}

export async function getStaticPaths() {
    const posts = getPosts();
    const paths = [];

    // Paths without filters
    for (var page = 1; page <= getPagesCount(posts); page++) {
        const pagePostsLink = getPostsLink(null, null, page);
        paths.push(getPathsItem(pagePostsLink));
    }

    // Paths with categories
    const categories = getCategories();

    for (const category of categories) {
        const categoryPosts = posts.filter((post) => post.category.slug === category.slug);
        for (var page = 1; page <= getPagesCount(categoryPosts); page++) {
            const link = getPostsLink(category.slug, null, page);
            paths.push(getPathsItem(link));
        }
    }

    // Paths with tags
    const tags = getTags();

    for (const tag of tags) {
        const tagPosts = posts.filter((post) => post.tags.find((postTag) => postTag.slug === tag.slug) !== undefined);
        for (var page = 1; page <= getPagesCount(tagPosts); page++) {
            const link = getPostsLink(null, tag.slug, page);
            paths.push(getPathsItem(link));
        }
    }

    return {
        paths,
        fallback: false
    };
}

function getPathsItem(postsLink) {
    var postsParams = postsLink.split("/").filter((param) => param);
    return {
        params: {
            postsParams
        }
    };
}
