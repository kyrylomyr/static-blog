import chain from "lodash";

import getPosts from "./posts";

export default function getCategories() {
    const posts = getPosts();
    return chain(posts).map("category").uniqBy("slug").orderBy().value();
}
