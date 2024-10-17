import { revalidateTag } from "next/cache";
import { revalidateTags } from "./data";

export async function revalidateMultipleTags(tags: revalidateTags[]) {
	await Promise.all(tags.map((tag) => revalidateTag(tag)));
}
