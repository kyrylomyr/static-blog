import fs from "fs";
import path from "path";
import matter from "gray-matter";
import chain from "lodash";

import getPrettyDate from "./prettyDate";
import { getPostLink, getPostsLink } from "../lib/links";
import { updateResourceUrls, joinExcerptAndContent } from "./content";

export default function getPosts() {
    const postsDirPath = "content/posts";

    const fileNames = fs.readdirSync(postsDirPath).filter((fn) => fn.substring(0, 1) !== "_");

    const posts = fileNames.map((fileName) => {
        const postId = path.parse(fileName).name;
        const postIdParts = postId.split("_");

        const date = postIdParts[0];
        const slug = postIdParts[1];

        const filePath = path.join(postsDirPath, fileName);
        const fileContent = fs.readFileSync(filePath);
        const matterResult = matter(fileContent, { excerpt: true });

        const category = matterResult.data.category;
        const tags = matterResult.data.tags.split(",").map((tag) => tag.trim());

        const excerpt = updateResourceUrls(matterResult.excerpt);
        const content = updateResourceUrls(matterResult.content);

        return {
            slug,
            title: matterResult.data.title,
            category: {
                slug: category,
                link: getPostsLink(category, null, null)
            },
            tags: tags.map((tag) => ({
                slug: tag,
                link: getPostsLink(null, tag, null)
            })),
            date,
            prettyDate: getPrettyDate(date),
            link: getPostLink(slug),
            meta: matterResult.data.meta || null,
            excerpt: excerpt || content,
            content: joinExcerptAndContent(content)
        };
    });

    return chain(posts).orderBy(["date", "title"], ["desc", "asc"]).value();
}
