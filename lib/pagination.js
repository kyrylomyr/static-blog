const postsPerPage = 5;

export function getPagesCount(posts) {
    return Math.ceil(posts.length / postsPerPage);
}

export function getPostsForPage(posts, page) {
    const pageStartIndex = (page - 1) * postsPerPage;
    return posts.slice(pageStartIndex, pageStartIndex + postsPerPage);
}
