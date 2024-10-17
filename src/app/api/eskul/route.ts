import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function GET() {
	try {
		const data = await prisma.eskul.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				pembina: true,
				ketua: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET /api/eskul error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData();

		if (!formData) {
			return NextResponse.json({ error: "Data is Requires" }, { status: 400 });
		}

		const logo = formData.get("logo") as File;
		const urlLogo = await put(logo.name, logo, {
			access: "public",
			multipart: true,
			token: process.env.BLOB_READ_WRITE_TOKEN,
		});

		const foto = formData.get("foto") as File;
		const urlFoto = await put(foto.name, foto, {
			access: "public",
			multipart: true,
			token: process.env.BLOB_READ_WRITE_TOKEN,
		});

		const newData = await prisma.eskul.create({
			data: {
				nama_eskul: formData.get("nama_eskul") as string,
				jadwal: formData.get("jadwal") as string,
				status: formData.get("status") as string,
				logo: urlLogo.url,
				foto: urlFoto.url,
				deskripsi: formData.get("deskripsi") as string,
				id_pembina: formData.get("id_pembina") as string,
				id_ketua: formData.get("id_ketua") as string,
			},
		});

		return NextResponse.json(newData, { status: 201 });
	} catch (error) {
		console.error("POST /api/eskul error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
