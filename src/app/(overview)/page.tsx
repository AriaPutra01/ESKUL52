"use client";

import ImageCorousel from "@/app/ImageCorousel";
import {
	Carousel,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ReuseCard from "@/app/ReuseCard";
import { ActivityIcon, GroupIcon, LinkIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
	return (
		<div className="px-[2rem]">
			<section className="px-[2rem]">
				<Carousel
					plugins={[
						Autoplay({
							delay: 3000,
						}),
					]}
					className="w-full">
					<ImageCorousel />
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>
			<main
				style={{
					backgroundImage:
						"linear-gradient(to bottom right, rgba(250, 250, 250, 1), rgba(250, 250, 250, 1))",
				}}
				className="flex flex-col gap-[5rem] justify-center items-center mt-[2rem] py-[5rem] w-full rounded-lg shadow-md">
				<section className="flex flex-col justify-center items-center gap-[2rem]">
					<div className="relative size-[13rem] rounded-full shadow-xl">
						<Image
							src={"/images/logopi.png"}
							className="block bg-blue-950 p-[.5rem] rounded-full"
							alt="logo"
							fill
						/>
					</div>
					<span className="text-3xl text-center">
						<p>Selamat Datang di Web Ekstrakurikuler</p>
						<h1 className="text-blue-800 font-bold">
							SMK PRAKARYA INTERNASIONAL
						</h1>
					</span>
				</section>
				<div className="grid grid-cols-1 gap-[1.5rem]">
					<h1 className="text-2xl font-medium mb-[1rem] text-center">
						Manfaat Kamu Mengikuti Ekstrakurikuler
					</h1>
					<div className="flex justify-between">
						<ReuseCard
							icon={<ActivityIcon className="text-[green]" />}
							title="Dapat Mengasah Skill dan Bakat"
							description="Mengembangkan dan meningkatkan bakat kamu agar semakin berbakat."
						/>
						<ReuseCard
							icon={<ZapIcon className="text-[red]" />}
							title="Menyalurkan Energi dan Kreativitas"
							description="Dengan ikut ekskul, kamu menyalurkan energi dan kreativitas."
						/>
						<ReuseCard
							icon={<LinkIcon className="text-[blue]" />}
							title="Mengajarkan Kerjasama Tim"
							description="Melatih kamu untuk bekerjasama dalam sebuah tim."
						/>
						<ReuseCard
							icon={<GroupIcon className="text-[purple]" />}
							title="Mendapat Teman Baru"
							description="Mendapatkan dan menambah teman baru."
						/>
					</div>
					<div className="w-full flex gap-[2rem] p-[2rem] bg-[#0A469A] rounded-md shadow-lg">
						<div className="relative w-[20rem] h-[15rem] shadow-xl">
							<Image
								src={"/images/siswapi.jpg"}
								className="object-cover block rounded-md shadow-lg"
								alt="logo"
								fill
							/>
						</div>
						<div className="w-[40rem] h-full flex flex-col justify-center text-white">
							<h1 className="text-xl font-bold border-b-2 border-gray-200 mb-[1rem]">
								Tekad Kami
							</h1>
							<span>
								Mewujudkan pelayanan pendidikan prima, sejalan dengan delapan
								standar nasional pendidikan dan sesuai dengan visi kami, yaitu
								menjadi SMK yang unggul, kompetitif, berdaya saing nasional dan
								internasional dengan menghasilkan pribadi-pribadi berakhlak
								mulia, cerdas, mandiri, bertanggung jawab, memiliki jiwa
								kewirausahaan yang berkeahlian siap kerja dan mampu bersaing di
								pasar global.
							</span>
						</div>
					</div>
				</div>
			</main>
			<footer className="text-center h-[10rem] flex justify-center items-center">
				<span>© Copyright 2024. By </span>
				<Link
					className="hover:text-blue-600"
					href="https://github.com/AriaPutra01">
					AriaPutra01
				</Link>
			</footer>
		</div>
	);
}
