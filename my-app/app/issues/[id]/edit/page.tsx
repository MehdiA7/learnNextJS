import React from "react";
import IssueForm from "../../../components/IssueForm";
import prisma from "@/prisma/client";

type Props = {
    params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
    const { id } = params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) },
    });
    if (!issue) {
        return <div>Issue not found</div>;
    }
    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
