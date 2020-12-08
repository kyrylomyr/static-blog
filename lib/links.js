export function getPostLink(slug) {
    return "/post/" + slug;
}

export function getPostsLink(category, tag, page) {
    let link = "/posts";

    if (category) {
        link += "/category/" + category;
    } else if (tag) {
        link += "/tag/" + tag;
    }

    if (page && page > 1) {
        link += "/" + page;
    }

    return link;
}

export function getPortfolioItemLink(slug) {
    return "/portfolio/" + slug;
}
