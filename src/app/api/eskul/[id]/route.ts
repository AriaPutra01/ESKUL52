import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu
import { del, put } from "@vercel/blob";

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	try {
		const data = await prisma.eskul.findUnique({
			where: {
				id: id,
			},
			include: {
				ketua: true,
				pembina: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error(`GET /api/eskul/${params} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function PUT(
	request: NextRequest,
	{
		params,
	}: {
		params: { id: string };
	}
) {
	try {
		const { id } = params;
		const formData = await request.formData();
		const { get } = formData;

		const dataLama = await prisma.eskul.findUnique({
			where: { id: id },
		});

		if (!dataLama) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const logo = get("logo") as File;
		await del(dataLama.logo as string);
		const urlLogo = await put(logo.name, logo, {
			access: "public",
			multipart: true,
			token: process.env.BLOB_READ_WRITE_TOKEN,
		});

		const foto = get("foto") as File;
		await del(dataLama.foto as string);
		const urlFoto = await put(foto.name, foto, {
			access: "public",
			multipart: true,
			token: process.env.BLOB_READ_WRITE_TOKEN,
		});

		const updatedData = await prisma.eskul.update({
			where: { id: id },
			data: {
				nama_eskul: (get("nama_eskul") as string) ?? dataLama.nama_eskul,
				jadwal: (get("jadwal") as string) ?? dataLama.jadwal,
				status: (get("status") as string) ?? dataLama.status,
				logo: urlLogo.url ?? dataLama.logo,
				foto: urlFoto.url ?? dataLama.foto,
				deskripsi: (get("deskripsi") as string) ?? dataLama.deskripsi,
				id_pembina: (get("id_pembina") as string) ?? dataLama.id_pembina,
				id_ketua: (get("id_ketua") as string) ?? dataLama.id_ketua,
			},
		});

		return NextResponse.json(updatedData);
	} catch (error) {
		console.error(`PUT /api/posts/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	const existingPost = await prisma.eskul.findUnique({
		where: { id: id },
	});

	if (!existingPost) {
		return NextResponse.json({ error: "eskul not found" }, { status: 404 });
	}

	await del(existingPost?.logo as string);

	await del(existingPost?.foto as string);

	try {
		await prisma.eskul.delete({
			where: { id: id },
		});
		return NextResponse.json({ message: "eskul deleted successfully" });
	} catch (error) {
		console.error(`DELETE /api/eskul/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
