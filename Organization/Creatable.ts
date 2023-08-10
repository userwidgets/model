import { flagly } from "flagly"
import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../Email"
import { Permissions } from "../User/Permissions"
import { Identifier } from "./Identifier"
export interface Creatable<T extends flagly.Flags = flagly.Flags> {
	id?: Identifier
	name: string
	permissions?: string[]
	users: {
		email: Email
		permissions?: { "*"?: Permissions.Application<T> | true; organization?: Permissions.Organization<T> }
	}[]
}

export namespace Creatable {
	function createType<T extends flagly.Flags = flagly.Flags>(type: isly.Type<T>): isly.Type<Creatable<T>> {
		return isly.object<Creatable<T>>({
			id: Identifier.type.optional(),
			name: isly.string(/.+/),
			permissions: isly.array(isly.string(/.+/)).optional(),
			users: isly.array(
				isly.object({
					email: Email.type,
					permissions: isly
						.object({
							application: Permissions.Application.type.create(type),
							organization: Permissions.Organization.type.create(type),
						})
						.optional(),
				})
			),
		})
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
