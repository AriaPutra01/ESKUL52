import { GetEskulId, GetUser } from "@/lib/data";
import React from "react";
import FormUbah from "./FormUbah";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

type Props = {
	params: {
		id: string;
	};
};

export default async function page({ params }: Props) {
	const eskul = await GetEskulId(params.id);
	const user = await GetUser();
	const session = await auth();
	const role = session?.user.role;
	if (role !== "admin") {
		notFound();
	}
	return (
		<main className="flex justify-center py-[2rem]">
			<div className="p-[1rem] bg-gray-100 w-full sm:w-[50vw] rounded-md">
				<h1 className="text-center p-[1rem] mb-[1rem] text-xl font-bold border-b-2 border-blue-950">
					Form Ubah Eskul {eskul.nama_eskul}
				</h1>
				<FormUbah eskul={eskul} user={user} />
			</div>
		</main>
	);
}
