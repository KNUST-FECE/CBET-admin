
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import client from "./lib/db";

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
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
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                let user = null;

                if (credentials?.password === "admin@delmac") {
                    return { id: "1", name: "Admin User", email: "admin@delmac.com" };
                }

                throw new InvalidLoginError();
            },
        }),
        ...authConfig.providers
    ]
});