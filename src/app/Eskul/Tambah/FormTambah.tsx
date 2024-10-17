/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EskulSchema, EskulValues } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ButtonBack } from "@/components/Buttons";
import { useToast } from "@/hooks/use-toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { tUser } from "@/lib/types";
import { Create } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function FormTambah({ user }: { user: tUser }) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<EskulValues>({
		resolver: zodResolver(EskulSchema),
	});

	const pending = form.formState.isSubmitting;

	const pembina: tUser[] = user.filter(
		(item: tUser) => item.role === "pembina" && !item.PembinaEskul
	) as tUser[];

	const ketua: tUser[] = user.filter(
		(item: tUser) => item.role === "ketua" && !item.KetuaEskul
	) as tUser[];

	const onSubmit = async (values: EskulValues) => {
		const formData = new FormData();
		for (const key in values) {
			const typedKey = key as keyof typeof values;
			formData.append(typedKey, values[typedKey]);
		}
		await Create("/eskul", formData, ["eskul", "user"]).then(() => {
			toast({
				title: "Data berhasil dibuat.",
			});
			router.push("/Eskul");
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-4 gap-[1rem]">
				<FormField
					control={form.control}
					name="nama_eskul"
					render={({ field }) => (
						<FormItem className="col-span-4">
							<FormLabel>Nama Eskul</FormLabel>
							<FormControl>
								<Input placeholder="Nama eskul" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="deskripsi"
					render={({ field }) => (
						<FormItem className="col-span-4">
							<FormLabel>Deksripsi Eskul</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Buatlah deskripsi singkat tentang eskul ini..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="logo"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem className="col-span-2">
							<FormLabel>Logo Eskul</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									type="file"
									onChange={(event) =>
										onChange(event.target.files && event.target.files[0])
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="foto"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem className="col-span-2">
							<FormLabel>Foto Eskul</FormLabel>
							<FormControl>
								<Input
									{...fieldProps}
									type="file"
									onChange={(event) =>
										onChange(event.target.files && event.target.files[0])
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jadwal"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Jadwal</FormLabel>
							<FormControl>
								<Input placeholder="Jadwal" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<FormLabel>Status</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="aktif" />
										</FormControl>
										<FormLabel className="font-normal">Aktif</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="tidak_aktif" />
										</FormControl>
										<FormLabel className="font-normal">Tidak Aktif</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="id_pembina"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Pembina</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										{pembina.length > 0 ? (
											<SelectValue placeholder="Pilih Pembina" />
										) : (
											<SelectValue placeholder="Tidak ada Pembina" />
										)}
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{pembina.length === 0 ? (
										<SelectItem value="" disabled>
											Tidak ada Pembina
										</SelectItem>
									) : (
										pembina.map((item: tUser, index: number) => (
											<SelectItem key={index} value={item.id}>
												{item.name}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="id_ketua"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Ketua</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										{pembina.length > 0 ? (
											<SelectValue placeholder="Pilih Ketua" />
										) : (
											<SelectValue placeholder="Tidak ada Ketua" />
										)}
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ketua.length === 0 ? (
										<SelectItem value="" disabled>
											Tidak ada Ketua
										</SelectItem>
									) : (
										ketua.map((item: tUser, index: number) => (
											<SelectItem key={index} value={item.id}>
												{item.name}
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="justify-self-end col-span-4 flex gap-[.5rem]">
					<ButtonBack />
					<Button disabled={pending} type="submit">
						{pending ? "Loading..." : "Tambah"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
