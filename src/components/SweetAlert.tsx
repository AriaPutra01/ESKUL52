import Swal from "sweetalert2";

export default function SweetConfirm(
	icon: "error" | "info" | "question" | "success" | "warning",
	confirm: string,
	action: () => void
) {
	Swal.fire({
		title: "Apakah anda yakin?",
		text: "Anda tidak bisa membatalkannya setelah ini!",
		icon: icon,
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: confirm,
	}).then((result) => {
		if (result.isConfirmed) {
			action();
		}
	});
}

export function SweetAlert(
	icon: "error" | "info" | "question" | "success" | "warning",
	title: string,
	text: string
) {
	Swal.fire({
		title: title,
		text: text,
		icon: icon,
	});
}
