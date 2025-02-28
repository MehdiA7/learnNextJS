import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import React from "react";

const prisma = new PrismaClient();

type Props = {
    params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
    const { id } = await params;

    if (isNaN(parseInt(id))) {
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!issue) return notFound();

    return (
        <>
            <Box>
                <Card>
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
                </Card>
            </Box>
        </>
    );
};

export default IssueDetailPage;
