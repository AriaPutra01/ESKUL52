/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PendaftarSchema, PendaftarValues } from "@/lib/zod";
import { tEskul } from "@/lib/types";
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
import { Create } from "@/lib/actions";
import { ButtonBack } from "../../../../../components/Buttons";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

type Props = {
	data: tEskul;
};

export default function FormDaftar({ data }: Props) {
	const { id, nama_eskul } = data;
	const { pending } = useFormStatus();
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<PendaftarValues>({
		resolver: zodResolver(PendaftarSchema),
		defaultValues: {
			id_eskul: id,
		},
	});

	const onSubmit = (values: PendaftarValues) => {
		try {
			Create("/pendaftar", values)
				.then(() => {
					toast({
						title: "Data anda berhasil dikirim.",
						description: "mohon untuk menunggu konfirmasi lebih lanjut :)",
					});
				})
				.then(() => {
					router.push("/Home");
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1rem]">
				<FormField
					control={form.control}
					name="nama_lengkap"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Nama Lengkap</FormLabel>
							<FormControl>
								<Input placeholder="Nama Lengkap" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jenis_kelamin"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<FormLabel>Jenis Kelamin</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="laki-laki" />
										</FormControl>
										<FormLabel className="font-normal">Laki-Laki</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="perempuan" />
										</FormControl>
										<FormLabel className="font-normal">Perempuan</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="kelas"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<FormLabel>Kelas</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="flex flex-col space-y-1">
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="10" />
										</FormControl>
										<FormLabel className="font-normal">10</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="11" />
										</FormControl>
										<FormLabel className="font-normal">11</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="12" />
										</FormControl>
										<FormLabel className="font-normal">12</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="jurusan"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<FormLabel>Jurusan</FormLabel>
							<FormControl>
								<Input placeholder="Jurusan" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="no_wa"
					render={({ field }) => (
						<FormItem className="col-span-1">
							<FormLabel>Nomor Whatsapp</FormLabel>
							<FormControl>
								<Input placeholder="Nomor Whatsapp" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="alasan"
					render={({ field }) => (
						<FormItem className="col-span-2">
							<FormLabel>Alasan Masuk Eskul {nama_eskul}</FormLabel>
							<FormControl>
								<Textarea
									placeholder={`jelasin alasan temen pengen ikut eskul ${nama_eskul}?`}
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="justify-self-end col-span-2 flex gap-[.5rem]">
					<ButtonBack />
					<Button disabled={pending} type="submit">
						{pending ? "Loading..." : "Daftar"}
					</Button>
				</div>
			</form>
		</Form>
	);
}
