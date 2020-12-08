import React from "react";
import Link from "next/link";
import Head from "next/head";

import Markdown from "../../components/markdown";

import { _ } from "lodash";
import getPosts from "../../lib/posts";

export default function Post({ post, prevPost, nextPost }) {
    return (
        <React.Fragment>
            <Head>
                <title>{post.title} - Static Blog</title>
                <meta name="description" content={post.meta} />
            </Head>
            <div>
                <h1>{post.title}</h1>
                <div>
                    <Markdown content={post.content} />
                </div>
                <PostMetadata post={post} />
                <PostLink linkDescription="Next post" postLink={nextPost} />
                <PostLink linkDescription="Previous post" postLink={prevPost} />
            </div>
        </React.Fragment>
    );
}

function PostLink({ linkDescription, postLink }) {
    if (postLink) {
        return (
            <div>
                {linkDescription}:{" "}
                <Link href={postLink.link}>
                    <a>{postLink.title}</a>
                </Link>
            </div>
        );
    } else {
        return <></>;
    }
}

function PostMetadata({ post }) {
    return (
        <div className="post-metadata">
            {post.prettyDate} in{" "}
            <Link href={post.category.link}>
                <a>{post.category.slug}</a>
            </Link>{" "}
            category with tags{" "}
            {post.tags
                .map((tag) => (
                    <Link key={tag.slug + "_metadataLink"} href={tag.link}>
                        <a>{tag.slug}</a>
                    </Link>
                ))
                .reduce((previos, current) => [previos, ", ", current])}
        </div>
    );
}

export async function getStaticProps({ params }) {
    const posts = getPosts();

    const index = _.findIndex(posts, (post) => post.slug === params.slug);
    let post = posts[index];

    const prevPost = index < posts.length - 1 ? posts[index + 1] : null;
    const nextPost = index > 0 ? posts[index - 1] : null;

    return {
        props: {
            post,
            prevPost: prevPost != null ? { title: prevPost.title, link: prevPost.link } : null,
            nextPost: nextPost != null ? { title: nextPost.title, link: nextPost.link } : null
        }
    };
}

export async function getStaticPaths() {
    const posts = getPosts();
    const paths = posts.map((post) => {
        return {
            params: {
                slug: post.slug
            }
        };
    });

    return {
        paths,
        fallback: false
    };
}
