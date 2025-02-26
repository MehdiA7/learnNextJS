import { NextRequest, NextResponse } from "next/server";
// Zod is a TypeScript-first schema declaration and validation library.
import { z } from "zod";
// for db interaction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// format de rule for the body request
const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required !").max(255),
    description: z.string().min(1, "Description is required !"),
});

// create a post function
export async function POST(request: NextRequest) {
    // get the body
    const body = await request.json();
    // verify if the body are good
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }
    // send the information to the database prisma.table.action({})
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
    });
    // send the response and the status
    return NextResponse.json(newIssue, { status: 201 });
}
