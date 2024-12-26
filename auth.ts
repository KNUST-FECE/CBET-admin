
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import client from "./lib/db";
import { ZLogin } from "./lib/schema";

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid email or password"
}
 
export const { handlers, auth } = NextAuth({
    adapter: MongoDBAdapter(client,
        {
            databaseName: "cbet-platform",
            collections: {
                Users: "members",
                Sessions: "member-sessions",
                Accounts: "member-accounts",
                VerificationTokens: "member-verification-tokens"
            }
        }
    ),
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const validatedData = ZLogin.safeParse(credentials)
                
                if(!validatedData.success) {
                    throw new InvalidLoginError();
                };

                // TODO: get member by email
                // TODO: if not member throw error
                // TODO: use bcrypt to compare member password and validated password
                // TODO: if authorise return member object else throw error


                return null;
            },
        }),
        ...authConfig.providers
    ]
});