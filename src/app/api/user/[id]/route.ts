import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika perlu

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	try {
		const data = await prisma.user.findUnique({
			where: {
				id: id,
			},
			include: { KetuaEskul: true, PembinaEskul: true },
		});
		return NextResponse.json(data);
	} catch (error) {
		console.error(`GET /api/pengguna/${params} error:`, error);
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

		const existingData = await prisma.user.findUnique({
			where: { id: id },
		});

		if (!existingData) {
			return NextResponse.json({ error: "Data not found" }, { status: 404 });
		}

		const updatedData = await prisma.user.update({
			where: { id: id },
			data: {
				name: body.name ?? existingData.name,
				username: body.username ?? existingData.username,
				email: body.email ?? existingData.email,
				password: body.password ?? existingData.password,
				role: body.role ?? existingData.role,
				image: body.image ?? existingData.image,
				// PembinaEskul: body.PembinaEskul ?? existingData.PembinaEskul,
				// KetuaEskul: body.KetuaEskul ?? existingData.KetuaEskul,
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

		const existingPost = await prisma.user.findUnique({
			where: { id: id },
		});

		if (!existingPost) {
			return NextResponse.json({ error: "user not found" }, { status: 404 });
		}

		await prisma.user.delete({
			where: { id: id },
		});

		return NextResponse.json({ message: "user deleted successfully" });
	} catch (error) {
		console.error(`DELETE /api/pendaftar/${params.id} error:`, error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
