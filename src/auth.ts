import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	pages: { signIn: "/Login" },
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				try {
					const { email, password } = await LoginSchema.parseAsync(credentials);
					const user = await prisma.user.findUnique({
						where: { email },
					});
					if (!user) {
						throw {
							email: "Email tidak ditemukan",
						};
					}
					if (password !== user.password) {
						throw {
							password: "Password salah",
						};
					}
					return user;
				} catch (error) {
					throw new Error(JSON.stringify(error));
				}
			},
		}),
	],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLogin = !!auth?.user;
			// const protectedRoutes = ["/Home"];
			// if (!isLogin && protectedRoutes.includes(nextUrl.pathname)) {
			// 	return Response.redirect(new URL("/Login", nextUrl));
			// }
			if (isLogin && nextUrl.pathname.startsWith("/Login")) {
				return Response.redirect(new URL("/Home", nextUrl));
			}
			return true;
		},

		jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},

		session({ session, token }) {
			session.user.id = token.sub;
			session.user.role = token.role;
			return session;
		},
	},
});
