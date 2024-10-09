/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	try {
		const data = await prisma.daftarKehadiran.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET /api/daftarKehadiran error:", error);
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

		const newData = await prisma.daftarKehadiran.create({
			data: {
				id_eskul: body.id_eskul,
				doc: body.doc,
			},
		});

		return NextResponse.json(newData, { status: 201 });
	} catch (error) {
		console.error("POST /api/daftarKehadiran error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
