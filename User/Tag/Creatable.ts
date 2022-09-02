import { Permissions } from "../Permissions"

export interface Creatable {
	email: string
	active: boolean
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
			typeof value.active == "boolean" &&
			typeof value.permissions == "object" &&
			(typeof value.permissions["*"] == undefined || Permissions.Application.is(value.permissions["*"])) &&
			Object.entries(value.permissions)
				.filter(([key, _]) => key != "*")
				.every(([_, organization]) => Permissions.Organization.is(organization))
		)
	}
}
