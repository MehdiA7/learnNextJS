import { Box, Card, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import EditButton from "./EditButton";
import ShowIssueDetails from "./ShowIssueDetails";

import { PrismaClient } from "@prisma/client";
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
                    <ShowIssueDetails issue={issue}/>
                </Card>
            </Box>
            <Box>
                <EditButton issueId={id}/>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
