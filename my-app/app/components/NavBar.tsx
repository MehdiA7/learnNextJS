"use client";
// Next and react
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
// React Icon
import { LuBug } from "react-icons/lu";
// TailWindCSS
import classNames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { label: "dashboard", href: "/" },
        { label: "issues", href: "/issues" },
    ];

    return (
        <div className="flex space-x-2 border-b-2 mb-5 items-center h-12">
            <Link href="/" className="ml-2">
                <LuBug />
            </Link>
            <ul className="flex space-x-2">
                {links.map((o) => (
                    <li key={o.href}>
                        <Link
                            href={o.href}
                            className={classNames({
                                "text-zinc-800": o.href === currentPath,
                                "text-zinc-400": o.href !== currentPath,
                                "hover:text-zinc-700 transition-colors": true,
                            })}
                        >
                            {o.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavBar;
