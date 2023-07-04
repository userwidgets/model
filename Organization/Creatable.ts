import { isly } from "isly"
import { Email } from "../Email"
import { Permissions } from "../User/Permissions"
import { Identifier } from "./Identifier"
export interface Creatable {
	id?: Identifier
	name: string
	permissions: string[]
	users: { email: string; permissions?: [Permissions.Application, Permissions.Organization] }[]
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		id: Identifier.type.optional(),
		name: isly.string(/.+/),
		permissions: isly.array(isly.string(/.+/)),
		users: isly.array(
			isly.object({
				email: Email.type,
				permissions: isly
					.tuple(
						isly.fromIs("Permissions.Application", Permissions.Application.is),
						isly.fromIs("Permissions.Organization", Permissions.Organization.is)
					)
					.optional(),
			})
		),
	})
	export const is = type.is
	export const flaw = type.flaw
}
