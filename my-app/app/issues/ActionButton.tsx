import React, { PropsWithChildren } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const ActionButton = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Button>
                <Link href="/issues/new">{children}</Link>
            </Button>
        </div>
    );
};

export default ActionButton;
