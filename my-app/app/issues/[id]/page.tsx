import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Box, Button, Card, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";

import React from "react";
import Link from "next/link";

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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
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
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
