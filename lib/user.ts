'use server';
import { User } from "@prisma/client";
import { db } from "./db";

export async function getUserByString(username: string): Promise<User> {
    return await db.user.findFirst({
        where: {
            username: username,
        }
    }) as User;
}
