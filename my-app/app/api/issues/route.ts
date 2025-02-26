import { NextRequest, NextResponse } from "next/server";
// for db interaction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// create a post function
export async function POST(request: NextRequest) {
    // get the body
    const body = await request.json();
    // send the information to the database prisma.table.action({})
    const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description },
    });
    // send the response and the status
    return NextResponse.json(newIssue, { status: 201 });
}
