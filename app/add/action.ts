'use server';

import { db } from "@/lib/db";

export async function addTask(title: string, description: string): Promise<[string, boolean]> {
    // await db.user.create({

    // })

    return ["Task added successfully!", true];
}
