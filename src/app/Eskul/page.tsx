import DataEskul from "@/app/Home/Eskul/DataEskul";
import SkeletonCard from "@/app/Home/Eskul/SkeletonCard";
import SkeletonTable from "@/app/Home/Eskul/SkeletonTable";
import React, { Suspense } from "react";
import { Read } from "@/lib/actions";
import DataTable from "@/components/ui/data-table";
import { columns } from "./Table/columns";

export default async function page() {
	const eskul = await Read("/eskul");
	return (
		<div className="w-full px-[2rem]">
			<div className="bg-gray-50 p-[2rem] rounded-md shadow-md">
				<div className="text-center flex flex-col items-center mb-[2rem]">
					<h1 className="w-full text-2xl font-bold mb-[1rem]">
						Daftar Ekstrakurikuler
					</h1>
					<div className="bg-blue-500 w-[20rem] h-[.2rem]" />
				</div>
				<Suspense fallback={<SkeletonCard />}>
					<DataEskul data={eskul} />
				</Suspense>
				{/* <Suspense fallback={<SkeletonTable />}>
					<DataTable columns={columns} data={eskul} />
				</Suspense> */}
			</div>
		</div>
	);
}
