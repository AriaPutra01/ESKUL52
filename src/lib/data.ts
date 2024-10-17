"use server";


export type revalidateTags = "eskul" | "pendaftar" | "user";

export const GetEskul = async () => {
	const res = await fetch("http://localhost:3000/api/eskul", {
		next: {
			tags: ["eskul"],
		},
	});
	return res.json();
};

export const GetEskulId = async (id?: string) => {
	const res = await fetch(`http://localhost:3000/api/eskul/${id}`);
	return res.json();
};

export const GetPendaftar = async () => {
	const res = await fetch("http://localhost:3000/api/pendaftar", {
		next: {
			tags: ["pendaftar"],
		},
	});
	return res.json();
};

export const GetPendaftarId = async (id?: string) => {
	const res = await fetch(`http://localhost:3000/api/pendaftar${id}`);
	return res.json();
};

export const GetUser = async () => {
	const res = await fetch("http://localhost:3000/api/user", {
		next: {
			tags: ["user"],
		},
	});
	return res.json();
};

export const GetUserId = async (id?: string) => {
	const res = await fetch(`http://localhost:3000/api/user/${id}`);
	return res.json();
};
