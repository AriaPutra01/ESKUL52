import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
	return (
		<div className="grid grid-cols-4 gap-[1rem] px-[2rem]">
			{Array.from({ length: 8 }).map((_, index) => (
				<Skeleton
					key={index}
					className="p-[1rem] bg-gray-200 flex flex-col justify-center items-center hover:-translate-y-1 shadow-lg transition-all">
					<Skeleton className="bg-gray-400 size-[10rem] rounded-full overflow-hidden"></Skeleton>
					<Skeleton className="flex flex-col gap-[.5rem] mt-[1rem]"></Skeleton>
					<Skeleton className="bg-gray-400 w-[5rem] h-[1.5rem] mb-[.5rem]" />
					<Skeleton className="bg-gray-400 w-[7rem] h-[1rem]" />
				</Skeleton>
			))}
		</div>
	);
}
