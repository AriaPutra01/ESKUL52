// pengguna
export type tUser = {
	id: string;
	name?: string;
	username?: string;
	email?: string;
	password?: string;
	emailVerified?: number;
	image?: string;
	role: number;
};

// Eskul
export type tEskul = {
	id: string;
	logo: string;
	nama_eskul: string;
	jadwal: string;
	deskripsi: string;
	foto: string;
	status: number;
	id_pembina: number;
	id_ketua: number;
	pembina: tUser;
	ketua: tUser;
};

// Pendaftar
export type tPendaftar = {
	id: string;
	id_eskul: number;
	nama_lengkap: string;
	jenis_kelamin: string;
	kelas: string;
	jurusan: string;
	no_wa: string;
	alasan: string;
	status: number;
};
