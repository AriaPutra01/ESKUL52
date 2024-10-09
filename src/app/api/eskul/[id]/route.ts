import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu

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
		const body = await request.json();

		const existingData = await prisma.eskul.findUnique({
			where: { id: id },
		});

		if (!existingData) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const updatedData = await prisma.eskul.update({
			where: { id: id },
			data: {
				nama_eskul: body.nama_eskul ?? existingData.nama_eskul,
				jadwal: body.jadwal ?? existingData.jadwal,
				status: body.status ?? existingData.status,
				logo: body.logo ?? existingData.logo,
				foto: body.foto ?? existingData.foto,
				deskripsi: body.deskripsi ?? existingData.deskripsi,
				id_pembina: body.id_pembina ?? existingData.id_pembina,
				id_ketua: body.id_ketua ?? existingData.id_ketua,
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
	try {
		const existingPost = await prisma.eskul.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return NextResponse.json({ error: "eskul not found" }, { status: 404 });
		}

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
