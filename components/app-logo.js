import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AppLogo() {
    return (
        <div>
            <Link href="/">
                <a>
                    <Image src="/logo.png" alt="logo" width={32} height={32} quality={100} />
                </a>
            </Link>
        </div>
    );
}
