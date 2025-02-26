import { NextRequest, NextResponse } from "next/server";
// for db interaction
import { PrismaClient } from "@prisma/client";
import createIssueSchema from "@/app/validationSchemas";
const prisma = new PrismaClient();

// create a post function
export async function POST(request: NextRequest) {
    // get the body
    const body = await request.json();
    // send the information to the database prisma.table.action({})
    // Validate request body
    const validation = createIssueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(
            { error: validation.error.errors },
            { status: 400 }
        );
    }
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
    });
    // send the response and the status
    return NextResponse.json(newIssue, { status: 201 });
}
