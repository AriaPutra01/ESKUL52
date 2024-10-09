import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
	return (
		<main className="flex flex-col gap-[5rem] justify-center items-center px-[5rem] w-full rounded-lg shadow-md">
			<Skeleton className="w-full h-[14rem] rounded-ms shadow-xl bg-gray-400"></Skeleton>
			<Skeleton className="size-[13rem] rounded-full shadow-xl bg-gray-400"></Skeleton>
			<Skeleton className="grid grid-cols-1 gap-[1.5rem]">
				<Skeleton className="bg-gray-200 w-full flex gap-[2rem] p-[2rem] rounded-md shadow-lg">
					<Skeleton className="bg-gray-400 relative w-[20rem] h-[15rem] shadow-xl"></Skeleton>
					<Skeleton className="bg-gray-400 w-[40rem] h-full flex flex-col justify-center "></Skeleton>
				</Skeleton>
			</Skeleton>
		</main>
	);
}
