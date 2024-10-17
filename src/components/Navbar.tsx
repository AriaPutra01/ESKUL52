import React from "react";
import { NavigationBar } from "./NavMenu";
import { auth } from "@/auth";

export default async function Navbar() {
	const session = await auth();
	return (
		<>
			<nav className="w-full h-[7rem]" />
			<nav className="fixed z-10 top-0 right-0 left-0 p-[1rem]">
				<div
					style={{
						backgroundImage:
							"linear-gradient(to bottom right, rgba(0, 0, 100, 1), rgba(0, 0, 50, 1))",
					}}
					className="w-full h-16 rounded-lg py-[1rem] px-[4rem] shadow-md text-white">
					<div className="w-full h-full flex justify-between items-center">
						<NavigationBar session={session} />
						<h1 className="text-xl font-extralight ">ESKUL52</h1>
					</div>
				</div>
			</nav>
		</>
	);
}
