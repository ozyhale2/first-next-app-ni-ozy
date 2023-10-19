import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const schema = z.coerce.string();
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                const password = schema.parse(credentials?.password)
    
                const user = await prisma.user.findUnique({
                    where: {
                        email: schema.parse(credentials?.email)
                    }
                })

                if(user){
                    let results =  await bcrypt.compare(password, user.password);
                    console.log(results);

                    if(results){
                        return user as any;
                    }
                    
                }

                return null;
            }
        })
        // ...add more providers here

    ],

    session: {
        strategy: "jwt"
    }
}

export default NextAuth(authOptions)