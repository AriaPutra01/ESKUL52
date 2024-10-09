import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	try {
		const data = await prisma.catatanKehadiran.findUnique({
			where: {
				id: id,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error(`GET /api/catatanKehadiran/${params} error:`, error);
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
		const body = await request.json();

		const existingData = await prisma.catatanKehadiran.findUnique({
			where: { id: id },
		});

		if (!existingData) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const updatedData = await prisma.catatanKehadiran.update({
			where: { id: id },
			data: {
				id_anggota: body.id_anggota ?? existingData.id_anggota,
				type: body.type ?? existingData.type,
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
	try {
		const { id } = params;

		const existingPost = await prisma.catatanKehadiran.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return NextResponse.json(
				{ error: "catatanKehadiran not found" },
				{ status: 404 }
			);
		}

		await prisma.catatanKehadiran.delete({
			where: { id: id },
		});

		return NextResponse.json({
			message: "catatanKehadiran deleted successfully",
		});
	} catch (error) {
		console.error(`DELETE /api/catatanKehadiran/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
