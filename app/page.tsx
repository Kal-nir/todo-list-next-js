'use client';
import Task from "@/components/task";
import { getUserByString } from "@/lib/user";
import { User } from "@prisma/client";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [ user, setUser ] = useState<User>();
  
  useEffect(() => {
    (async () => {
      setUser(await getUserByString(session?.user?.name as string))
    })()
  }, []);

  return (
    <SessionProvider>
      <main>
        <h1>To-do List</h1>
        { user?.display_name && (<h3>Hello {user.display_name}!</h3>) }
        <a href="/add">Add Task</a>
        <h2>In-Progress Tasks</h2>
        <Task />
        <h2>Completed Tasks</h2>
        <Task />
      </main>
    </SessionProvider>
  );
}
