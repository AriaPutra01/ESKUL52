"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type ButtonBackProps = {
	className?: string;
	children?: React.ReactNode;
};

export function ButtonBack({ className }: ButtonBackProps) {
	const router = useRouter();
	return (
		<Button
			type="button"
			variant={"secondary"}
			onClick={() => router.back()}
			className={`flex gap-2 ${className}`}>
			<ArrowLeft className="w-4" />
			<p>Kembali</p>
		</Button>
	);
}
