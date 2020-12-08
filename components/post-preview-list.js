import React from "react";

import PostPreview from "./post-preview";

export default function PostPreviewList({ posts }) {
    return (
        <div>
            {posts.map((post) => (
                <PostPreview key={post.slug + "_postPreview"} post={post} />
            ))}
        </div>
    );
}
