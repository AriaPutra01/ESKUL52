import { ButtonBack } from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import { tEskul } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { GetEskulId } from "@/lib/data";

type Props = {
	params: {
		id: string;
	};
};

export default async function page({ params }: Props) {
	const { id } = params;
	const eskul: tEskul = await GetEskulId(id);
	const session = await auth();
	return (
		<div className="w-full p-[2rem]">
			<div className="flex flex-col gap-[2rem] bg-gray-50 p-[2rem] rounded-md shadow-md">
				<div className="text-center flex flex-col gap-[1rem] items-center">
					<div className="relative size-[15rem] rounded-full overflow-hidden">
						<Image
							className="object-cover object-center"
							src={eskul.logo}
							alt={eskul.nama_eskul}
							fill
						/>
					</div>
					<span className="mb-[1rem] text-4xl font-bold p-[1rem] text-center max-w-xl text-blue-950 bg-gray-200 rounded-md">
						{eskul.nama_eskul}
					</span>
					<div className="grid grid-cols-1">
						<h1 className="text-2xl font-bold p-[.5rem] text-center max-w-xl text-blue-950 border-b-2 border-blue-950">
							Pengelola
						</h1>
						<span className="text-xl font-medium p-[.5rem] text-center max-w-xl text-gray-600">
							Pembina: {eskul.pembina.name}
						</span>
						<span className="text-xl font-medium p-[.5rem] text-center max-w-xl text-gray-600">
							Ketua {eskul.ketua.name}
						</span>
					</div>
					<div>
						<h1 className="text-2xl font-bold p-[.5rem] text-center max-w-xl text-blue-950 border-b-2 border-blue-950">
							Tentang Eskul
						</h1>
						<span className="text-xl font-medium p-[.5rem] text-center max-w-xl text-gray-600">
							<h1>{eskul.deskripsi}</h1>
						</span>
					</div>
					<div className="relative w-[50rem] h-[30rem] ring ring-blue-950 overflow-hidden">
						<Image
							className="object-cover object-center"
							src={eskul.foto}
							alt={eskul.nama_eskul}
							fill
						/>
					</div>
				</div>
				<div className="flex gap-[1rem] self-end">
					{!session && (
						<Button asChild>
							<Link href={`/Eskul/${id}/Daftar`}>Daftar</Link>
						</Button>
					)}
					<ButtonBack />
				</div>
			</div>
		</div>
	);
}
