import React from "react";
import IssueForm from "../../../components/IssueForm";
import prisma from "@/prisma/client";

type Props = {
    params: Promise<{ id: string }>;
};

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
