import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	try {
		const data = await prisma.daftarKehadiran.findUnique({
			where: {
				id: id,
			},
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error(`GET /api/daftarKehadiran/${params} error:`, error);
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

		const existingData = await prisma.daftarKehadiran.findUnique({
			where: { id: id },
		});

		if (!existingData) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const updatedData = await prisma.daftarKehadiran.update({
			where: { id: id },
			data: {
				id_eskul: body.id_eskul ?? existingData.id_eskul,
				doc: body.doc ?? existingData.doc,
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

		const existingPost = await prisma.daftarKehadiran.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return NextResponse.json(
				{ error: "daftarKehadiran not found" },
				{ status: 404 }
			);
		}

		await prisma.daftarKehadiran.delete({
			where: { id: id },
		});

		return NextResponse.json({
			message: "daftarKehadiran deleted successfully",
		});
	} catch (error) {
		console.error(`DELETE /api/daftarKehadiran/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
