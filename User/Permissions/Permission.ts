export type Permission = {
	read?: boolean
	write?: boolean
}

export namespace Permission {
	export function is(value: Permission | any): value is Permission & Record<string, any> {
		return (
			typeof value == "object" &&
			["boolean", "undefined"].includes(typeof value.read) &&
			["boolean", "undefined"].includes(typeof value.write)
		)
	}
}
