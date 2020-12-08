import React from "react";
import Link from "next/link";

import "../styles/app-navigation.less";

export default function AppNavigation() {
    return (
        <div className="app-navigation">
            <Link href="/posts">Posts</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About</Link>
        </div>
    );
}
