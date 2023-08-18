import { flagly } from "flagly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Permissions } from "../Permissions"

export interface Creatable<T extends flagly.Flags = flagly.Flags> {
	email: Email
	active: boolean
	permissions: Permissions<T>
}

export namespace Creatable {
	function createType<T extends flagly.Flags = flagly.Flags>(
		type: isly.Type<T>
	): isly.object.ExtendableType<Creatable<T>> {
		return isly.object<Creatable<T>>({
			email: Email.type,
			active: isly.boolean(),
			permissions: Permissions.type.create(type),
		})
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
