import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	try {
		const data = await prisma.pendaftar.findUnique({
			where: {
				id: id,
			},
			include: { eskul: true },
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error(`GET /api/pendaftar/${params} error:`, error);
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

		const existingData = await prisma.pendaftar.findUnique({
			where: { id: id },
		});

		if (!existingData) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const updatedData = await prisma.pendaftar.update({
			where: { id: id },
			data: {
				id_eskul: body.id_eskul ?? existingData.id_eskul,
				nama_lengkap: body.nama_lengkap ?? existingData.nama_lengkap,
				jenis_kelamin: body.jenis_kelamin ?? existingData.jenis_kelamin,
				kelas: body.kelas ?? existingData.kelas,
				jurusan: body.jurusan ?? existingData.jurusan,
				no_wa: body.no_wa ?? existingData.no_wa,
				status: body.status ?? existingData.status,
				alasan: body.alasan ?? existingData.alasan,
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

		const existingPost = await prisma.pendaftar.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return NextResponse.json(
				{ error: "pendaftar not found" },
				{ status: 404 }
			);
		}

		await prisma.pendaftar.delete({
			where: { id: id },
		});

		return NextResponse.json({ message: "pendaftar deleted successfully" });
	} catch (error) {
		console.error(`DELETE /api/pendaftar/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
