import { Permissions } from "../User/Permissions"

export interface Creatable {
	name: string
	permissions: ["organization", "user", ...string[]]
	users: { email: string; permissions?: [Permissions.Application, Permissions.Organization] }[]
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.name == "string" &&
			Array.isArray(value.permissions) &&
			value.permissions.every((permission: string | any) => typeof permission == "string") &&
			["organization", "user"].every(permission => value.permissions.includes(permission)) &&
			Array.isArray(value.users) &&
			value.users.every(
				(user: any) =>
					typeof user == "object" &&
					user &&
					typeof user.email == "string" &&
					(user.permissions == undefined ||
						(Array.isArray(user.permissions) &&
							user.permissions.length == 2 &&
							Permissions.Application.is(user.permissions[0]) &&
							Permissions.Organization.is(user.permissions[1])))
			)
		)
	}
}
