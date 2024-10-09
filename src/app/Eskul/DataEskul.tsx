import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { tEskul } from "@/lib/types";
import Link from "next/link";

type Props = {
	data: tEskul[];
};

export default async function DataEskul({ data }: Props) {
	return (
		<main className="grid grid-cols-4 gap-[.5rem] px-[2rem]">
			{data.length > 0 ? (
				data?.map((field: tEskul, index: number) => (
					<Link key={index} href={`/Home/Eskul/${field.id}`}>
						<Card className="p-[1rem] bg-gray-100 flex flex-col justify-center items-center hover:-translate-y-1 shadow-lg transition-all">
							<CardHeader className="p-1 bg-blue-950 rounded-full">
								<div className="relative size-[12rem] rounded-full overflow-hidden">
									<Image
										className="object-cover"
										src={field.logo}
										alt={field.nama_eskul}
										fill
									/>
								</div>
							</CardHeader>
							<CardContent className="flex flex-col gap-[.5rem] mt-[1rem] text-center">
								<CardTitle>{field.nama_eskul}</CardTitle>
								<CardDescription>{field.jadwal}</CardDescription>
							</CardContent>
						</Card>
					</Link>
				))
			) : (
				<div className="col-span-4 text-center bg-[red]/[.5] p-[1rem] rounded-md text-white">
					Tidak ada eskul yang tersedia !!
				</div>
			)}
		</main>
	);
}
