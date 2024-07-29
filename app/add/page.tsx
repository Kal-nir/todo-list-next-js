"use client";
import { FormEvent } from "react";
import { addTask } from "./action";

export default function Add() {
    async function onSubmit(data: FormData) {
        const body = await data;
        const title = body.get("title") as string;
        const description = body.get("description") as string;
        const [ result, status ] = await addTask(title, description);
    }

    return (
        <main>
            <h1>Add Task</h1>
            <form action={onSubmit}>
                <label htmlFor="title">Title of Task</label>
                <input name="title" id="title" type="text" required />
                <br/>
                <label htmlFor="description">Description of Task</label>
                <textarea name="description" id="description"></textarea>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}