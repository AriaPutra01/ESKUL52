import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type Props = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

export default function ReuseCard({ icon, title, description }: Props) {
	return (
		<Card className="w-[15rem] flex flex-col justify-center ring hover:-translate-y-1 shadow-lg transition-all">
			<CardHeader className="self-start">{icon}</CardHeader>
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardContent>
		</Card>
	);
}
