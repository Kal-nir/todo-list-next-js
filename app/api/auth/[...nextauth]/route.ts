import NextAuth, { AuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

const options: AuthOptions = {
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
            username: { label: "Username", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any, req) {
            const userCredentials = {
                username: credentials.username,
                password: credentials.password,
            }

            const res = await fetch(
                `${process.env.NEXTAUTH_URL}/api/user/login`,
                {
                    method: "POST",
                    body: JSON.stringify(userCredentials),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const user = await res.json();

            if (res.ok && user) {
                return user;
            } else {
                return null;
            }
        },
    }),
  ],

  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },

  callbacks: {
    async session(params: {session: Session, token: JWT, user: AdapterUser}) {
      if (params.user !== null) {
        
        params.session.user = params.user;
      }
      return await params.session;
    },

    async jwt({ token }: { token: any }) {
       return await token;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
