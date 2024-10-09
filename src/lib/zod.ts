import { z } from "zod";

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
