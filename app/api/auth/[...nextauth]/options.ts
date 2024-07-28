import type { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { SHA256 } from "crypto-js";

export const options: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                const username = credentials?.username as string;
                const password = SHA256(credentials?.password as string).toString();
                const user = await db.user.findUnique({
                    where: {
                        username: username,
                    },
                });

                if (user?.password === password) {
                    const result: User = {
                        id: user.user_id.toString(),
                        name: user.username,
                    }
                    return result;
                } else {
                    return null;
                }
            },
        })
    ]
}
