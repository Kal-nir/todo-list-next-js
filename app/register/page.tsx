"use client";
import { useState } from "react";
import { createUser } from "./action";
import { useRouter } from "next/navigation";

export default function Register() {
    const [feedback, setFeedback] = useState<string>();
    const [startCounter, setStartCounter] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(2);
    const router = useRouter();

    if (startCounter) {
        if (counter === 0) {
            router.push('/api/auth/signin/');
        }

        setInterval(() => {
            setCounter(counter - 1);
        }, 1000)
    }

    async function onSubmit(data: FormData) {
        const body = await data;
        const [result, status] = await createUser(
            body.get("display-name") as string,
            body.get("username") as string,
            body.get("password") as string,
            body.get("confirm-password") as string,
        );

        setFeedback(result);

        if (status) {
            setStartCounter(true);
        }
    }

    return (
        <main>
            <form action={onSubmit}>
                {feedback && (<p>{feedback}</p>)}
                <label htmlFor="display-name">Display Name</label>
                <input name="display-name" type="text" />
                <br />
                <label htmlFor="username">Username</label>
                <input name="username" type="text" />
                <br />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" />
                <br />
                <label htmlFor="confirm-password">Confirm Password</label>
                <input name="confirm-password" type="password" />
                <br />
                <button type="submit">Register</button>
            </form>
        </main>
    );
}

// 'use client';
// import { db } from "@/lib/db";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function Register() {
//     const [displayName, setDisplayName] = useState<string>();
//     const [username, setUsername] = useState<string>();
//     const [password, setPassword] = useState<string>();
//     const [confirmPassword, setConfirmPassword] = useState<string>();
//     const [samePassword, setSamePassword] = useState<boolean>(true);
//     const [feedback, setFeedback] = useState<string>();
//     const [accountCreated, setAccountCreated] = useState<boolean>(false);
//     const [timerRedirect, setTimerRedirect] = useState<number>(2);
//     const router = useRouter();

//     if (timerRedirect === 0) {
//         router.push('/login');
//     }

//     if (accountCreated) {
//         setInterval(() => {
//             setTimerRedirect(timerRedirect - 1);
//         }, 1000);
//     }

//     async function onSubmit() {
//         if (password !== confirmPassword) {
//             setSamePassword(false);
//             return;
//         }

//         try {
//             const body = {
//                 display_name: displayName,
//                 username: username,
//                 password: password,
//             }
//             const response = await fetch('/register/api', {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(body),
//             })

//             if (response.ok) {
//                 setFeedback("Account created successfuly. Redirecting to login page...");
//                 setAccountCreated(true);
//             } else {
//                 console.log(response.json())
//                 setFeedback("Account Creation Failed. Server Error.")
//             }
//         } catch(error) {
//             console.log(error);
//             setFeedback(error as string);
//         }
//     }

//     return (
//         <main>
//             <div>
//                 { feedback && (<p>{feedback}</p>) }
//                 { !samePassword && (<p>Passwords do not match!</p>) }
//                 <label>Display Name</label>
//                 <input value={displayName} onChange={e => setDisplayName(e.target.value)} type="text" />
//                 <br />
//                 <label>Username</label>
//                 <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
//                 <br />
//                 <label>Password</label>
//                 <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
//                 <br />
//                 <label>Confirm Password</label>
//                 <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" />
//                 <br />
//                 <button onClick={onSubmit}>Register</button>
//             </div>
//         </main>
//     )
// }
