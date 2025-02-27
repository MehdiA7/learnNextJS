import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { PrismaClient } from "@prisma/client";
import { Box, Card, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

const prisma = new PrismaClient();

type Props = {
    params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
    //if(typeof params.id !== 'number') return notFound();
    //if(!parseInt(params?.id)) return notFound();

    const id = parseInt(params.id);
    
    if (isNaN(id)) {
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: { id: id },
    });

    if (!issue) return notFound();

    return (
        <div>
            <Box>
                <Card>
                    <Text as="p" size={"6"}>{issue.title}</Text>
                    <IssueStatusBadge status={issue.status}/>
                    <Text as="p" size={"2"}>{issue.createdAt.toDateString()}</Text>
                    <Text as="p">{issue.description}</Text>
                </Card>
            </Box>
        </div>
    );
};

export default IssueDetailPage;
