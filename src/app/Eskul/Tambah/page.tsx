import React from "react";
import FormTambah from "./FormTambah";
import { GetEskul, GetUser } from "@/lib/data";
import { auth } from "@/auth";
import { notFound } from "next/navigation"; // Import notFound dari next/navigation

export default async function page() {
	const session = await auth();
	const role = session?.user.role;
	const user = await GetUser();

	if (role !== "admin") {
		notFound();
	}

	return (
		<main className="flex justify-center py-[2rem]">
			<div className="p-[1rem] bg-gray-100 w-full sm:w-[50vw] rounded-md">
				<h1 className="text-center p-[1rem] mb-[1rem] text-xl font-bold border-b-2 border-blue-950">
					Form Tambah Eskul
				</h1>
				<FormTambah user={user} />
			</div>
		</main>
	);
}
