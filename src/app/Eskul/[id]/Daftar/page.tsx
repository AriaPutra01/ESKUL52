import FormDaftar from "@/app/Home/Eskul/[id]/Daftar/FormDaftar";
import { Read } from "@/lib/actions";
import { tEskul } from "@/lib/types";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

export default async function page({ params }: Props) {
	const { id } = params;
	const eskul: tEskul = await Read(`/eskul/${id}`);
	return (
		<main className="flex justify-center py-[2rem]">
			<div className="p-[1rem] bg-gray-100 w-full sm:w-[50vw] rounded-md">
				<h1 className="text-center p-[1rem] mb-[1rem] text-xl font-bold border-b-2 border-blue-950">
					Form Pendaftaran Eskul {eskul.nama_eskul}
				</h1>
				<FormDaftar data={eskul} />
			</div>
		</main>
	);
}
