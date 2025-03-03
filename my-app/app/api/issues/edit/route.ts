import { NextRequest, NextResponse } from "next/server";
// for db interaction
import { PrismaClient } from "@prisma/client";
import createIssueSchema from "@/app/validationSchemas";
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body[1]);

    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.errors },
            { status: 400 }
        );
    }

    const updateIssue = await prisma.issue.update({
        where: {
            id: body[0],
        },
        data: {
            title: body[1].title,
            description: body[1].description,
        },
    });
    return NextResponse.json(updateIssue, { status: 201 });
}
