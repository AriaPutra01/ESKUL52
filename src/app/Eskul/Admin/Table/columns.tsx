"use client";

import { tEskul } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SweetConfirm, { SweetAlert } from "@/components/SweetAlert";
import { Delete } from "@/lib/actions";

export const columns: ColumnDef<tEskul>[] = [
	{
		accessorKey: "nama_eskul",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Nama Eskul
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "jadwal",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Jadwal Eskul
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "pembina.name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Pembina
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "ketua.name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Ketua
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "status",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
					Status
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const field = row.original;
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<Link href={`/Eskul/${field.id}`}>
							<DropdownMenuItem className="cursor-pointer">
								Detail
							</DropdownMenuItem>
						</Link>
						<Link href={`/Eskul/${field.id}/Ubah`}>
							<DropdownMenuItem className="cursor-pointer">
								Ubah
							</DropdownMenuItem>
						</Link>
						<span
							onClick={() =>
								SweetConfirm(
									"warning",
									"Hapus",
									async () =>
										await Delete(`/eskul/${field.id}`, ["eskul", "user"]).then(
											() => {
												SweetAlert(
													"success",
													"Eskul Berhasil",
													"Eskul Berhasil Dihapus"
												);
											}
										)
								)
							}>
							<DropdownMenuItem className="cursor-pointer">
								Hapus
							</DropdownMenuItem>
						</span>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
