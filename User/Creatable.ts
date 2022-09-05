import { Name as UserName } from "./Name"
import { Password } from "./Password"
import { Permissions as Permissions } from "./Permissions"

export interface Creatable {
	email: string
	password: Password.Set
	name: UserName
	permissions: {
		"*"?: Permissions.Application
		[organizationId: string]: Permissions.Organization | undefined
	}
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			Password.Set.is(value.password) &&
			UserName.is(value.name) &&
			typeof value.permissions == "object" &&
			value.permissions &&
			(value.permission?.["*"] == undefined || Permissions.Application.is(value.permissions["*"])) &&
			Object.entries(value.permissions)
				.filter(([key, _]) => key != "*")
				.every(([_, organization]) => Permissions.Organization.is(organization))
		)
	}
}
