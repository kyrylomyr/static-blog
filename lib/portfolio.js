import fs from "fs";
import path from "path";
import matter from "gray-matter";
import chain from "lodash";

import { getPortfolioItemLink } from "../lib/links";
import { updateResourceUrls, joinExcerptAndContent } from "./content";

export default function getPortfolioItems() {
    const portfolioDirPath = "content/portfolio";

    const fileNames = fs.readdirSync(portfolioDirPath).filter((fn) => fn.substring(0, 1) !== "_");

    const portfolioItems = fileNames.map((fileName) => {
        const portfolioItemId = path.parse(fileName).name;
        const portfolioItemIdParts = portfolioItemId.split("_");

        const id = portfolioItemIdParts[0];
        const slug = portfolioItemIdParts[1];

        const filePath = path.join(portfolioDirPath, fileName);
        const fileContent = fs.readFileSync(filePath);
        const matterResult = matter(fileContent, { excerpt: true });

        const excerpt = updateResourceUrls(matterResult.excerpt);
        const content = updateResourceUrls(matterResult.content);

        return {
            id,
            slug: slug,
            title: matterResult.data.title,
            link: getPortfolioItemLink(slug),
            meta: matterResult.data.meta || null,
            excerpt: excerpt || content,
            content: joinExcerptAndContent(content)
        };
    });

    return chain(portfolioItems).orderBy(["id"], ["asc"]).value();
}
