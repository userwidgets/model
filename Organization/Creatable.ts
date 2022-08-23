export interface Creatable {
	name: string
	permissions: ["organization", "user", ...string[]]
	users: string[]
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			Array.isArray(value.users) &&
			value.users.every((user: any) => typeof user == "string") &&
			["organization", "user"].every(permission => value.permissions.includes(permission))
		)
	}
}
