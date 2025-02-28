import React from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

type Props = {
    href: string;
    children: string;
};

const Link = ({ href, children }: Props) => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    );
};

export default Link;
