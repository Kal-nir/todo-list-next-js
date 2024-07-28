import { db } from "@/lib/db";
import { SHA256 } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { display_name, username, password }: { display_name: string, username: string, password: string } = body;

    try {
        await db.user.create({
            data: {
                display_name: display_name,
                username: username,
                password: SHA256(password).toString(),
            }
        })
        return NextResponse.json({ message: "Account created successfully." }, { status: 200 });
    } catch(error) {
        console.log(error)
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
