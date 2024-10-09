import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
		const body = await request.json();

		if (!body) {
			return NextResponse.json({ error: "Data is Requires" }, { status: 400 });
		}

		const newEskul = await prisma.eskul.create({
			data: {
				nama_eskul: body.nama_eskul,
				jadwal: body.jadwal,
				status: body.status,
				logo: body.logo,
				foto: body.foto,
				deskripsi: body.deskripsi,
				id_pembina: body.id_pembina,
				id_ketua: body.id_ketua,
			},
		});

		return NextResponse.json(newEskul, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return NextResponse.json(
					{ error: "pembina atau ketua sudah memegang eskul lain" },
					{ status: 409 }
				);
			}
		}
		console.error("POST /api/eskul error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
