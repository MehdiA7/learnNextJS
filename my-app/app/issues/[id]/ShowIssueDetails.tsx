import React from "react";
import { Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { issue } from "@prisma/client";

const ShowIssueDetails = ( { issue }: { issue: issue} ) => {
    return (
        <>
            <Heading size={"6"} className="mb-2">
                {issue.title}
            </Heading>
            <div className="flex space-x-4">
                <IssueStatusBadge status={issue.status} />
                <Text as="p" size={"2"}>
                    {issue.createdAt.toDateString()}
                </Text>
            </div>
            <hr className="mt-2 mb-4" />
            <div className="prose ">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </div>
        </>
    );
};

export default ShowIssueDetails;
