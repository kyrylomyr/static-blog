import chain from "lodash";

import getPosts from "./posts";

export default function getTags() {
    const posts = getPosts();
    return chain(posts)
        .map("tags")
        .flatten()
        .groupBy("slug")
        .map((group) => ({ tag: group[0], count: group.length }))
        .orderBy(["count", "tag"], ["desc", "asc"])
        .map((tagGroup) => tagGroup.tag)
        .value();
}
