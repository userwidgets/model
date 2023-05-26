import { isly } from "isly"

export type Permission = {
	read?: boolean
	write?: boolean
}

export namespace Permission {
	export const type = isly.object<Permission>({
		read: isly.boolean().optional(),
		write: isly.boolean().optional(),
	})
	export const is = type.is
}
