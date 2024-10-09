export default function fetchData() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// Simulasi proses fetching data
			const data = {
				name: "John Doe",
				age: 30,
			};
			// Simulasi error (bisa diubah sesuai kebutuhan)
			// reject(new Error('Terjadi kesalahan saat mengambil data'));
			resolve(data);
		}, 60000 * 60); // Simulasi waktu loading selama 1 menit
	});
}