import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<footer className="text-center h-[10rem] flex justify-center items-center">
			<span>© Copyright 2024. By </span>
			<Link
				className="hover:text-blue-600"
				href="https://github.com/AriaPutra01">
				AriaPutra01
			</Link>
		</footer>
	);
}
