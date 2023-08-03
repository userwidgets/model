import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../Email"
import { Permissions } from "../User/Permissions"
import { Identifier } from "./Identifier"
export interface Creatable<T extends authly.Payload.Data = authly.Payload.Data> {
	id?: Identifier
	name: string
	permissions: string[]
	users: { email: Email; permissions?: [Permissions.Application<T>, Permissions.Organization<T>] }[]
}

export namespace Creatable {
	function createType<T extends authly.Payload.Data = authly.Payload.Data>(
		type: isly.Type<T> = isly.record(isly.string(), isly.undefined())
	): isly.Type<Creatable<T>> {
		return isly.object<Creatable<T>>({
			id: Identifier.type.optional(),
			name: isly.string(/.+/),
			permissions: isly.array(isly.string(/.+/)),
			users: isly.array(
				isly.object({
					email: Email.type,
					permissions: isly
						.tuple(Permissions.Application.type.create(type), Permissions.Organization.type.create(type))
						.optional(),
				})
			),
		})
	}
	export const type = Object.assign(createType(), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
