import { Button } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import React from "react";

const LoadingNewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <Skeleton className="mb-4" width="8rem"/>
            <Skeleton />
            <Skeleton height="25rem"/>
            <Button >
                Submit New Issue
            </Button>
        </div>
    );
};

export default LoadingNewIssuePage;
