import React from "react";
import Link from "next/link";

import Markdown from "./markdown";

export default function PostPreview({ post }) {
    return (
        <div>
            <h3>
                <Link href={post.link}>
                    <a>{post.title}</a>
                </Link>
            </h3>
            <div>
                {post.prettyDate} in {post.category.slug} category
            </div>
            <div>
                <Markdown content={post.excerpt} />
            </div>
        </div>
    );
}
