import React from "react";
import Link from "next/link";

export default function PostFilterList({ categories, tags }) {
    return (
        <div>
            <div>
                <h2>Categories</h2>
                {categories.map((category) => (
                    <CategoryLink key={category.slug + "_categoryLink"} category={category} />
                ))}
            </div>
            <div>
                <h2>Tags</h2>
                {tags.map((tag) => (
                    <TagLink key={tag.slug + "_tagLink"} tag={tag} />
                ))}
            </div>
        </div>
    );
}

function CategoryLink({ category }) {
    return (
        <li>
            <Link href={category.link}>
                <a>{category.slug}</a>
            </Link>
        </li>
    );
}

function TagLink({ tag }) {
    return (
        <li>
            <Link href={tag.link}>
                <a>{tag.slug}</a>
            </Link>
        </li>
    );
}
