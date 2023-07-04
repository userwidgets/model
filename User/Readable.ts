import * as isoly from "isoly"
import { isly } from "isly"
import { Email } from "../Email"
import type { User } from "./index"
import { Name } from "./Name"
import { Permissions } from "./Permissions"

export interface Readable {
	name: Name
	email: Email
	permissions: Permissions.Readable
	created?: isoly.DateTime
	modified?: isoly.DateTime
}
export namespace Readable {
	export const type = isly.object<Readable>({
		name: Name.type,
		email: Email.type,
		permissions: isly.fromIs("Permissions.Readable", Permissions.Readable.is),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function to(user: User, applicationId: string): Required<Readable> {
		return {
			...user,
			permissions: {
				...(user.permissions[applicationId] && user.permissions[applicationId]),
			},
		}
	}
}
