'use server';

import { db } from "@/lib/db";
import { SHA256 } from "crypto-js";

export async function createUser(displayName: string, username: string, password: string, confirmPassword: string): Promise<[string, boolean]> {

    if (password !== confirmPassword) {
        return ["Passwords do not match!", false];
    }

    const userExists = !!await db.user.findUnique({
        where: {
            username: username,
        },
    });

    console.log(userExists);

    if (userExists) {
        return ["Username is already used! Find another one.", false]
    }

    await db.user.create({
        data: {
            display_name: displayName,
            username: username,
            password: SHA256(password).toString(),
        }
    })

    return ["Account created successfully! Redirecting you to the login page shortly.", true];
}
