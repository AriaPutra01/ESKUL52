"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { tEskul } from "@/lib/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

type Props = {
	eskul: tEskul[];
};

export default function CorouselEskul({ eskul }: Props) {
	return (
		<section className="px-[2rem]">
			<Carousel
				plugins={[
					Autoplay({
						delay: 3000,
					}),
				]}
				className="w-full">
				<CarouselContent>
					{eskul?.length > 0 ? (
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
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
