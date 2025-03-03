import React from "react";
import IssueForm from "../../../components/IssueForm";
import prisma from "@/prisma/client";
import { use } from "react";

type Props = {
    params: Promise<{ id: string }>;
};

const EditIssuePage = ({ params }: Props) => {
    const { id } = use(params);

    const issue = use(prisma.issue.findUnique({
        where: { id: parseInt(id) },
    }));

    if (!issue) {
        return <div>Issue not found</div>;
    }

    return <IssueForm issue={issue} />;
};

export default EditIssuePage;
