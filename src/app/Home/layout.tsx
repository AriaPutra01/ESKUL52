import { auth } from "@/auth";
import React from "react";

export default async function Layout({
	CorouselEskul,
	Siswa,
	Admin,
	Footer,
}: Readonly<{
	children: React.ReactNode;
	CorouselEskul: React.ReactNode;
	Siswa: React.ReactNode;
	Admin: React.ReactNode;
	Footer: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<div>
			{!session && (
				<>
					{CorouselEskul}
					{Siswa}
				</>
			)}
			{session?.user.role === "admin" && Admin}
			{Footer}
		</div>
	);
}
