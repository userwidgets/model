import * as isoly from "isoly"
import type { User } from "./index"
import { Name } from "./Name"
import { Permissions } from "./Permissions"

export interface Readable {
	name: Name
	email: string
	permissions: { application?: Permissions.Application; organization?: Permissions.Organization }
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
			(value.permissions.application == undefined || Permissions.Application.is(value.permissions.application)) &&
			(value.permissions.organization == undefined || Permissions.Organization.is(value.permissions.organization)) &&
			(value.created == undefined || isoly.DateTime.is(value.created)) &&
			(value.modified == undefined || isoly.DateTime.is(value.modified))
		)
	}
	export function to(user: User, applicationId: string, organizationId: string): Required<Readable> {
		return {
			...user,
			permissions: {
				...(user.permissions[applicationId]["*"] && { application: user.permissions[applicationId]["*"] }),
				...(user.permissions[applicationId][organizationId] && {
					organization: user.permissions[applicationId][organizationId],
				}),
			},
		}
	}
}
