import { flagly } from "flagly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Name } from "../../User/Name"
import { Permissions } from "../Permissions"
import { Properties as KeyProperties } from "./Properties"

type BaseProperties<T extends flagly.Flags> = {
	name: { first: string; last: string }
	email: Email
	permissions: Permissions<T>
}
export type Creatable<
	K extends Creatable.Properties = Creatable.Properties,
	P extends flagly.Flags = flagly.Flags
> = BaseProperties<P> & K
export namespace Creatable {
	export type Properties = KeyProperties
	export const Properties = KeyProperties
	function createType<K extends Properties, P extends flagly.Flags>(
		key: isly.Type<K>,
		permissions: isly.Type<P>
	): isly.Type<Creatable<K, P>> {
		return isly.intersection<Creatable<K, P>, K, BaseProperties<P>>(
			key,
			isly.object({
				name: Name.type,
				email: Email.type,
				permissions: Permissions.type.create(permissions),
			})
		)
	}
	export const type = Object.assign(createType(Properties.type, flagly.Flags.type), {
		create: createType,
	})
	export const is = type.is
	export const flaw = type.flaw
}
