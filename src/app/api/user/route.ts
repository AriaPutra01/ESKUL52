import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
	try {
		const data = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				PembinaEskul: true,
				KetuaEskul: true,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET /api/pengguna error:", error);
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

		const newEskul = await prisma.user.create({
			data: {
				name: body.name,
				username: body.username,
				email: body.email,
				password: body.password,
				role: body.role,
				image: body.image,
				PembinaEskul: body.PembinaEskul,
				KetuaEskul: body.image,
			},
		});

		return NextResponse.json(newEskul, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2002") {
				return NextResponse.json(
					{ error: "Nama Pengguna Sudah digunakan" },
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
