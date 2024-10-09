"use client";

import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AlertMessage({
	message,
	children,
	action,
}: {
	message: string;
	children: React.ReactNode;
	action: () => void;
}) {
	return (
		<AlertDialog>
			<AlertDialogTrigger className="text-start">{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Apakah anda benar benar yakin?</AlertDialogTitle>
					<AlertDialogDescription>
						Tindakan ini tidak dapat dibatalkan! {message}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={action}>Continue</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
