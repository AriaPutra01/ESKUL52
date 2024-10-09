import React, { useEffect, useState } from "react";
import { Read } from "@/lib/actions";
import { tEskul } from "@/lib/types";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "../components/ui/skeleton";

export default function ImageCorousel() {
	const [eskul, setEskul] = useState<tEskul[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		Read("/eskul").then((data) => {
			setEskul(data);
			setLoading(false);
		});
	}, []);

	return (
		<CarouselContent>
			{!loading ? (
				eskul?.length > 0 ? (
					eskul?.map((eskul: tEskul) => (
						<CarouselItem key={eskul.id}>
							<Card>
								<CardContent className="relative h-[50vh] flex items-center justify-center">
									<Image
										className="object-cover rounded-lg"
										src={eskul.foto}
										alt={eskul.nama_eskul}
										fill
									/>
								</CardContent>
							</Card>
						</CarouselItem>
					))
				) : (
					<div className="bg-[red]/[.5] w-full h-[50vh] flex justify-center items-center rounded-md">
						<div className="bg-transparent text-3xl font-bold text-white">
							Tidak ada eskul yang tersedia !!
						</div>
					</div>
				)
			) : (
				<Skeleton className="bg-white w-full h-[50vh] flex justify-center items-center">
					<Skeleton className="bg-transparent text-3xl font-bold text-gray-200">
						Loading...
					</Skeleton>
				</Skeleton>
			)}
		</CarouselContent>
	);
}
