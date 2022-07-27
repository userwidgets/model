export interface Creatable {
	name: string
	permissions: ["organization", "user", ...string[]]
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			["organization", "user"].every(permission => value.permissions.includes(permission))
		)
	}
}
