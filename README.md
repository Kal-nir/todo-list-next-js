# Todo List in Next JS

This is a learning project for me to learn more about Next JS. The overall is pretty simple, you create an account, you add task, and designate on whether or not they're completed. The following content is the full session notes based on my experiences learning the stack as a whole.

## Stacks Used

- Next JS
- NextAuth
- Prisma
- PostgreSQL

# Session Notes

As an overview, creating this project has been a great learning experience. I have started this project without watching a tutorial video and learning the struggles on the way. In this session, I have learned much more about app router, server-side rendering vs client-side rendering, the difference between server components and client components, managing a schema with many-based relationships, and an ORM-dependent database.

## App Router

Before Next 13, projects used to have a page router as a default. It's an interesting implementation of the MVC architecutre where you have to differentiate which are model, which are views, and which are controllers. But the greatest thing about the page router is the emphasis of the view where you make the UI of the app via React JS. Not only that, it does mix view and controller in one place depending on your style of coding. But most of the time, you separate both the view in controller in a REST-based relationship. However, it is recognized that page router is not flexible enough. It's rigid, but doesn't offer the kind of freedom when dealing with data and server-based behaviors. Hence, App Router was introduced in Next 13. It's somewhat of a revolutionary feature compared to other stuff I've seen. The difference between the page router and the app router is performance, code-quality control, and mainly server-centric. It dissolves the MVC architecture by making it into a soup that tastes really good.

**Performance** - I really don't mind performance unless I'm the one assigned for DevOps. In my experience, it's truly a joy working with an app-based router when it comes to its deployment. It responds really well from the client side. Even if I expect it to be laggy, it continues to amaze me that everything works as smoothly as butter.

**Code Quality Control** - All I can say is it doesn't force me to be verbose with my of achieving a certain behavior. It's sweet, simple, and manageable.

**Server-Centric** - Since I'm using PostgreSQL and Prisma for this project, there's a constant need to make queries on the server. With App Router, it essentially made my communication to the server a lot easier. It does that either directly from the view, or make a server-based component to communicate with the backend.

## Server-Side Rendering vs Client-Side Rendering

By default, Next JS uses server-side rendering for all routes and views when you're using the app router. You can convert a view into a client by indicating that the view is indeed a client. It's done by putting the following string `"use client";` at the top of your file. Server-side rendering does make it easier to handle data, and you are able to handle data closely rather than doing it via server props or doing it in an API. The major difference that both has is the code style. Client-Side rendering forces you to use the MVC Architecture, while server-side rendering makes it an option, and sometimes let you put a spin on such an architecture.

## Server Components vs Client Components

Client components is similar to client-side rendering, where you need to indicate `"use client";` on the component or view file you're using. However, if you want to create server compoonents, you need to indicate `"use server";` on the server component or view file you're using. Both indication must at be the top of the file. The most notable difference between them is what you can and cannot use. In server components, you can't ues React hooks, or any React interactivity feautres. But enables you to work closely with the backend libraries. In client components, you can use the interactivity features, but can't use any backend libraries.

In order to use both, the central view must either be a server-based view or a client based view. This decision is important as it defines the style on how you implement your logic. If you want it to be a server-based view, you're going to be using a lot of client components just to add some interactivity. This is good if your app is both UI-heavy and logic-heavy. But if your logic isn't really that heavy, and you want to emphasize more on the UI, it's better that your view must be a client-based view, where you only need to import server-based components. This way, you only need to handle the backend whenever you really need to, all in one action.
