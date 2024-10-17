import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable() {
	return (
		<Skeleton className="p-[1rem] bg-gray-200 hover:-translate-y-1 shadow-lg transition-all">
			<table className="w-full">
				<thead>
					<tr>
						{Array.from({ length: 6 }).map((_, index) => (
							<th key={index} className="py-[1rem] px-[2rem]">
								<Skeleton className="w-full h-[2rem] bg-gray-400  hover:-translate-y-1 shadow-lg transition-all" />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 4 }).map((_, index) => (
						<tr key={index}>
							{Array.from({ length: 6 }).map((_, index) => (
								<td key={index} className="py-[1rem] px-[3rem]">
									<Skeleton className="w-full h-[2rem] bg-gray-400  hover:-translate-y-1 shadow-lg transition-all" />
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</Skeleton>
	);
}
