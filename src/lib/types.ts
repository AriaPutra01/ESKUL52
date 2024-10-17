// pengguna
export type tUser = {
	filter(arg0: (item: tUser) => boolean): unknown;
	id: string;
	name?: string;
	username?: string;
	email?: string;
	password?: string;
	emailVerified?: number;
	image?: string;
	role: string;
	PembinaEskul: tEskul;
	KetuaEskul: tEskul;
};

// Eskul
export type tEskul = {
	id: string;
	nama_eskul: string;
	jadwal: string;
	deskripsi: string;
	logo: any;
	foto: any;
	status: string;
	id_pembina: string;
	id_ketua: string;
	pembina: tUser;
	ketua: tUser;
};

// Pendaftar
export type tPendaftar = {
	id: string;
	id_eskul: string;
	nama_lengkap: string;
	jenis_kelamin: string;
	kelas: string;
	jurusan: string;
	no_wa: string;
	alasan: string;
	status: string;
};
