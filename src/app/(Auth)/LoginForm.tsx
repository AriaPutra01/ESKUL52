/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginValues } from "@/lib/zod";
import { Button } from "@/components/ui/button"; // Pastikan ini sesuai dengan komponen button dari Shadcn
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonBack } from "@/components/Buttons";
import { useToast } from "@/hooks/use-toast"; // Pastikan ini sesuai dengan hook toast yang kamu gunakan
import { login } from "@/lib/actions";

export default function LoginForm() {
	const { toast } = useToast();

	const form = useForm<LoginValues>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { setError } = form;

	const pending = form.formState.isSubmitting;

	const onSubmit = async (values: LoginValues) => {
		const result = await login(values);
		if (result?.error) {
			const parsedError = JSON.parse(result.error);
			if (parsedError.email) {
				setError("email", {
					type: "manual",
					message: parsedError.email,
				});
			}
			if (parsedError.password) {
				setError("password", {
					type: "manual",
					message: parsedError.password,
				});
			}
		} else {
			toast({
				title: "Login Berhasil",
				description: "Selamat datang kembali!",
			});
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1rem]">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Alamat Email</FormLabel>
							<FormControl>
								<Input placeholder="Alamat email anda" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="justify-self-end col-span-2 flex gap-[.5rem]">
					<ButtonBack />
					<Button disabled={pending} type="submit">
						{pending ? "Authenticating..." : "Login"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
