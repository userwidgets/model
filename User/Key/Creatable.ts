import { isly } from "isly"
import { Email } from "../../Email"
import { Name } from "../../User/Name"
import { Permissions } from "../Permissions"

export interface Creatable<T extends Record<string, unknown> = Record<string, unknown>> {
	name: { first: string; last: string }
	email: Email
	permissions: Permissions<T>
}

export namespace Creatable {
	function createType<T extends Record<string, unknown>>(
		type: isly.Type<T> = isly.record(isly.string(), isly.union(isly.undefined(), isly.unknown()))
	): isly.Type<Creatable<T>> {
		return isly.object<Creatable<T>>({
			name: Name.type,
			email: Email.type,
			permissions: Permissions.type.create(type),
		})
	}
	export const type = Object.assign(createType(), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
