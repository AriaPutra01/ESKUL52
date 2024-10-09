/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { LoginValues } from "./zod";

const API_URL = "http://localhost:3000/api";

export async function Read(url: string) {
	return await fetch(API_URL + url, {
		cache: "no-store",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

export async function Create(url: string, data: any) {
	try {
		const body = await fetch(API_URL + url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		return body.json();
	} catch (error) {
		console.error(error);
	}
}

export async function Update(url: string, data: any) {
	return await fetch(API_URL + url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((res) => res.json());
}

export async function Delete(url: string) {
	return await fetch(API_URL + url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());
}

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
