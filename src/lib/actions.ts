/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { LoginValues } from "./zod";
import { revalidateMultipleTags } from "./revalidation";
import { revalidateTags } from "./data";

const API_URL = "http://localhost:3000/api";

export async function Create(
	url: string,
	data: any,
	revalidate: revalidateTags[]
) {
	const response = await fetch(API_URL + url, {
		method: "POST",
		body: data instanceof FormData ? data : JSON.stringify(data),
	});
	if (revalidate) {
		await revalidateMultipleTags(revalidate);
	}
	return response.json();
}

export async function Update(
	url: string,
	data: any,
	revalidate: revalidateTags[]
) {
	const response = await fetch(API_URL + url, {
		method: "PUT",
		body: data instanceof FormData ? data : JSON.stringify(data),
	});
	if (revalidate) {
		await revalidateMultipleTags(revalidate);
	}
	return response.json();
}

export async function Delete(url: string, revalidate: revalidateTags[]) {
	const req = await fetch(API_URL + url, {
		method: "DELETE",
	});
	if (!req) {
		return { error: "Internal Server Error" };
	}
	if (revalidate) {
		await revalidateMultipleTags(revalidate);
	}
}

// AUTH

export async function login(values: LoginValues) {
	const { email, password } = values;
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/Home",
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						error: "invalid credential",
					};
				default:
					return {
						error: error.cause?.err?.message,
					};
			}
		}
		throw error;
	}
}

export async function logout() {
	await signOut({ redirectTo: "/Login" });
}
