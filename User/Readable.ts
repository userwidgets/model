import * as isoly from "isoly"
import type { User } from "./index"
import { Name } from "./Name"
import { Permissions } from "./Permissions"

export interface Readable {
	name: Name
	email: string
	permissions: Permissions.Readable
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
			Permissions.Readable.is(value.permissions) &&
			(value.created == undefined || isoly.DateTime.is(value.created)) &&
			(value.modified == undefined || isoly.DateTime.is(value.modified))
		)
	}
	export function to(user: User, applicationId: string): Required<Readable> {
		return {
			...user,
			permissions: {
				...(user.permissions[applicationId] && user.permissions[applicationId]),
			},
		}
	}
}
