import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Permissions } from "../Permissions"

export interface Creatable<T extends authly.Payload.Data = authly.Payload.Data> {
	email: Email
	active: boolean
	permissions: Permissions<T>
}

export namespace Creatable {
	function createType<T extends authly.Payload.Data = authly.Payload.Data>(
		type: isly.Type<T> = isly.record(isly.string(), isly.undefined())
	): isly.object.ExtendableType<Creatable<T>> {
		return isly.object<Creatable<T>>({
			email: Email.type,
			active: isly.boolean(),
			permissions: Permissions.type.create(type),
		})
	}

	export const type = Object.assign(createType(), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
