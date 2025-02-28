import React from "react";
import IssueForm from "./components/IssueForm";
import { issue, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Props = {
    params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    if (!issue) {
        return <div>Issue not found</div>;
    }
    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
