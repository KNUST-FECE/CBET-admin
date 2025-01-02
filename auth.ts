
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import client from "./lib/db";
import bcrypt from "bcrypt";
import { ZLogin } from "./lib/schema";
import { getMemberByEmail } from "./lib/queries/members";

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
                const validatedData = ZLogin.safeParse(credentials);

                if (!validatedData.success) throw new InvalidLoginError();

                const { email, password } = validatedData.data;

                try {

                    const member = await getMemberByEmail(email);

                    if (!member) throw new InvalidLoginError();

                    const isPasswordValid = await bcrypt.compare(password, member.password);

                    if (!isPasswordValid) throw new InvalidLoginError();

                    return { id: member.id, email: member.email, name: member.name };

                } catch (error) {
                    throw new InvalidLoginError();
                }
            },
        }),
        ...authConfig.providers
    ]
});