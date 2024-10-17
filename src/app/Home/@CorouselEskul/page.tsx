import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import CorouselEskul from "./Corousel";
import { GetEskul } from "@/lib/data";

export default async function page() {
	const eskul = await GetEskul();
	return (
		<div className="px-[2rem]">
			<Suspense
				fallback={
					<Skeleton className="bg-white w-full h-[50vh] flex justify-center items-center">
						<Skeleton className="bg-transparent text-3xl font-bold text-gray-200"></Skeleton>
					</Skeleton>
				}>
				<CorouselEskul eskul={eskul} />
			</Suspense>
		</div>
	);
}
