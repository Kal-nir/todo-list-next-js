"use client";
import { useEffect, useState } from "react";
import { addTask } from "./action";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { getUserByString } from "@/lib/user";

export default function Add() {
    const [feedback, setFeedback] = useState<string>();
    const router = useRouter();
    const { data: session } = useSession();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        (async () => {
            setUser(await getUserByString(session?.user?.name as string))
        })()
    }, []);

    async function onSubmit(data: FormData) {
        if (!user) {
            return;
        }

        const body = await data;
        const title = body.get("title") as string;
        const description = body.get("description") as string;
        const [result, status] = await addTask(user, title, description);

        setFeedback(result);

        if (status) {
            router.push('/');
        }
    }

    return (
        <main>
            <h1>Add Task</h1>
            {feedback && (<p>{feedback}</p>)}
            <form action={onSubmit}>
                <label htmlFor="title">Title of Task</label>
                <input name="title" id="title" type="text" required />
                <br />
                <label htmlFor="description">Description of Task</label>
                <textarea name="description" id="description"></textarea>
                <br />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}