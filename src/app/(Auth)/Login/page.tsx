import LoginForm from "@/app/(Auth)/LoginForm";
import React from "react";

export default function page() {
	return (
		<main className="flex justify-center py-[2rem]">
			<div className="p-[1rem] bg-gray-100 w-full sm:w-[50vw] rounded-md">
				<h1 className="text-center p-[1rem] mb-[1rem] text-xl font-bold border-b-2 border-blue-950">
					Form Login
				</h1>
				<LoginForm />
			</div>
		</main>
	);
}
