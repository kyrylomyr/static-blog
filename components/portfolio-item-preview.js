import React from "react";
import Link from "next/link";

import Markdown from "./markdown";

export default function PortfolioItemPreview({ portfolioItem }) {
    return (
        <div>
            <h3>
                <Link href={portfolioItem.link}>
                    <a>{portfolioItem.title}</a>
                </Link>
            </h3>
            <div>
                <Markdown content={portfolioItem.excerpt} />
            </div>
        </div>
    );
}
