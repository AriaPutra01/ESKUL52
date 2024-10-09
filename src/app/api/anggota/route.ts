/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	try {
		const data = await prisma.anggota.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET /api/anggota error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		if (!body) {
			return NextResponse.json({ error: "Data is Requires" }, { status: 400 });
		}

		const newData = await prisma.anggota.create({
			data: {
				nama_lengkap: body.nama_lengkap,
				jenis_kelamin: body.jenis_kelamin,
				no_wa: body.no_wa,
				id_eskul: body.id_eskul,
				kelas: body.kelas,
				jurusan: body.jurusan,
			},
		});

		return NextResponse.json(newData, { status: 201 });
	} catch (error) {
		console.error("POST /api/anggota error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
