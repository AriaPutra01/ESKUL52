import { z } from "zod";
import prisma from "./prisma";
import { GetEskul } from "./data";
import { tEskul } from "./types";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

// pendaftar
export const PendaftarSchema = z.object({
	id_eskul: z.string(),
	nama_lengkap: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	jenis_kelamin: z.string(),
	kelas: z.string(),
	jurusan: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	no_wa: z
		.string()
		.min(10, "Minimal 10 karakter")
		.max(13, "Maximal 13 karakter"),
	alasan: z
		.string()
		.min(10, "Minimal 10 karakter")
		.max(200, "Maximal 200 karakter"),
});
export type PendaftarValues = z.infer<typeof PendaftarSchema>;

// User Login

export const LoginSchema = z.object({
	email: z.string().email("Email tidak valid"),
	password: z
		.string()
		.min(8, "password harus lebih dari 8 karakter")
		.max(32, "password harus kurang dari 32 karakter"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

// Eskul

export const EskulSchema = z.object({
	nama_eskul: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	jadwal: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	deskripsi: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(200, "Maximal 200 karakter"),
	logo: z
		.any()
		.refine((file) => file?.size > 0, { message: "logo harus diisi." })
		.refine(
			(file) => file?.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file?.type),
			{
				message: "harus format .jpg, .jpeg, .png and .webp",
			}
		)
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: `harus lebih kecil dari 5MB.`,
		}),
	foto: z
		.any()
		.refine((file) => file?.size > 0, { message: "foto harus diisi." })
		.refine(
			(file) => file?.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file?.type),
			{
				message: "harus format .jpg, .jpeg, .png and .webp",
			}
		)
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: `harus lebih kecil dari 5MB.`,
		}),
	status: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	id_pembina: z.string().cuid(),
	id_ketua: z.string().cuid(),
});
export type EskulValues = z.infer<typeof EskulSchema>;

export const UpdateEskulSchema = z.object({
	nama_eskul: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	jadwal: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	deskripsi: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(200, "Maximal 200 karakter"),
	logo: z
		.any()
		.optional()
		.refine(
			(file) => file?.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file?.type),
			{
				message: "harus format .jpg, .jpeg, .png and .webp",
			}
		)
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: `harus lebih kecil dari 5MB.`,
		}),
	foto: z
		.any()
		.optional()
		.refine(
			(file) => file?.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file?.type),
			{
				message: "harus format .jpg, .jpeg, .png and .webp",
			}
		)
		.refine((file) => file?.size <= MAX_FILE_SIZE, {
			message: `harus lebih kecil dari 5MB.`,
		}),
	status: z
		.string()
		.min(2, "Minimal 2 karakter")
		.max(50, "Maximal 50 karakter"),
	id_pembina: z.string().cuid(),
	id_ketua: z.string().cuid(),
});
export type UpdateEskulValues = z.infer<typeof UpdateEskulSchema>;
