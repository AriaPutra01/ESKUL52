import React from "react";
import { Activity, Users } from "lucide-react";
import { tUser } from "@/lib/types";
import { GetEskul, GetUser } from "@/lib/data";

export default async function page() {
	const eskul = await GetEskul();
	const user = await GetUser();
	const totalEskul = eskul?.length;
	const totalPembina = user?.filter	(
		(item: tUser) => item.role === "pembina"
	).length;
	const totalKetua = user?.filter(
		(item: tUser) => item.role === "ketua"
	).length;
	return (
		<div
			style={{
				backgroundImage:
					"linear-gradient(to bottom right, rgba(250, 250, 250, 1), rgba(250, 250, 250, 1))",
			}}
			className="mx-[2rem] rounded-md shadow-md px-[1rem] py-[2rem]">
			<main className="grid grid-cols-3 w-full">
				<div className="flex flex-col justify-center items-center gap-[.5rem]">
					<span className="text-4xl font-bold">{totalEskul}</span>
					<span className="text-xl font-bold">Eskul yang aktif</span>
					<div>
						<Activity />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-[.5rem]">
					<span className="text-4xl font-bold">{totalPembina}</span>
					<span className="text-xl font-bold">Pembina Eskul</span>
					<div>
						<Users />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-[.5rem]">
					<span className="text-4xl font-bold">{totalKetua}</span>
					<span className="text-xl font-bold">Ketua Eskul</span>
					<div>
						<Users />
					</div>
				</div>
			</main>
		</div>
	);
}
