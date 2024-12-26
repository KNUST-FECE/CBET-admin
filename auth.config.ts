import type { NextAuthConfig } from "next-auth"

export default {
  providers: [],
  pages: {
        signIn: "/login",
        error: "/login"
  }
} satisfies NextAuthConfig