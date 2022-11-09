import * as isoly from "isoly"
import { Name } from "./Name"
import { Permissions } from "./Permissions"

export interface Readable {
	name: Name
	email: string
	permissions: {
		"*"?: Permissions.Application | undefined
		[organizationId: string]: Permissions.Organization | undefined
	}
	created?: isoly.DateTime
	modified?: isoly.DateTime
}
export namespace Readable {
	export function is(value: any | Readable): value is Readable {
		return (
			typeof value == "object" &&
			value &&
			Name.is(value.name) &&
			typeof value.email == "string" &&
			typeof value.permissions == "object" &&
			value.permissions &&
			Object.entries(value.permissions)
				.filter(([key, _]) => key != "*")
				.every((entry): entry is [string, Permissions.Organization] => Permissions.Organization.is(entry[0])) &&
			(value.permissions["*"] == undefined || Permissions.Application.is(value.permissions["*"])) &&
			(value.created == undefined || isoly.DateTime.is(value.created)) &&
			(value.modified == undefined || isoly.DateTime.is(value.modified))
		)
	}
}
