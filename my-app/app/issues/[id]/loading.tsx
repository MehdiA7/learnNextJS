import { Box, Card, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import React from "react";

const LoadingIssueDetailPage = () => {
    return (
        <Box>
            <Card>
                <Heading size={"6"} className="mb-2">
                    <Skeleton width="10rem" />
                </Heading>
                <div className="flex space-x-4">
                    <Skeleton />
                    <Text as="p" size={"2"}>
                        <Skeleton width="8rem" />
                    </Text>
                </div>
                <hr className="mt-2 mb-4" />
                <div className="prose ">
                    <Skeleton width="10rem"/>
                    <Skeleton width="15rem"/>
                    <Skeleton width="18rem"/>
                </div>
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;
