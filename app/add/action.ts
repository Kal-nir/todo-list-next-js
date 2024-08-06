'use server';

import { db } from "@/lib/db";
import { getUserByString } from "@/lib/user";
import { User } from "@prisma/client";

export async function addTask(user: User, title: string, description: string): Promise<[string, boolean]> {
    try {
        await db.task.create({
            data: {
                user: {
                    connect: {
                        user_id: user.user_id,
                    },
                },
                title: title,
                description: description,
                status: false,
            }
        })
    } catch(error) {
        const err = error as Error;
        console.log(err);
        return [err.message, false];
    }

    return ["Task added successfully!", true];
}
