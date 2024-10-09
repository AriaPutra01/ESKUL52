/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	try {
		const data = await prisma.catatanKehadiran.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error("GET /api/catatanKehadiran error:", error);
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

		const newData = await prisma.catatanKehadiran.create({
			data: {
				id_anggota: body.id_anggota,
				type: body.type,
			},
		});

		return NextResponse.json(newData, { status: 201 });
	} catch (error) {
		console.error("POST /api/catatanKehadiran error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
