import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Name } from "../../User/Name"
import { Permissions } from "../Permissions"

type Properties<T extends authly.Payload.Data> = {
	name: { first: string; last: string }
	email: Email
	permissions: Permissions<T>
}
export type Creatable<
	K extends authly.Payload.Data = authly.Payload.Data,
	P extends authly.Payload.Data = authly.Payload.Data
> = Properties<P> & K
export namespace Creatable {
	function createType<K extends authly.Payload.Data, P extends authly.Payload.Data>(
		key: isly.Type<K> = isly.record(isly.string(), isly.undefined()),
		permissions: isly.Type<P> = isly.record(isly.string(), isly.undefined())
	): isly.Type<Creatable<K, P>> {
		return isly.intersection<Creatable<K, P>, K, Properties<P>>(
			key,
			isly.object({
				name: Name.type,
				email: Email.type,
				permissions: Permissions.type.create(permissions),
			})
		)
	}
	export const type = Object.assign(createType(), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
}
