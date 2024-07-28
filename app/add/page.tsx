"use client";
import { FormEvent } from "react";

export default function Login() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData: FormData = new FormData(event.currentTarget);
        const taskTitle: String = new String(formData.get("title"));
        const taskStatus: boolean = false;
        const taskDescription: String = new String(formData.get("description"));
    }

    return (
        <main>
            <h1>Add Task</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title of Task</label>
                <input name="title" id="title" type="text" />
                <label htmlFor="description">Description of Task</label>
                <textarea name="description" id="description"></textarea>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}