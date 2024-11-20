import { isly } from "isly"
import { Creatable as User } from "../User/Creatable"
import { Identifier } from "./Identifier"
export interface Creatable {
	id?: Identifier
	name: string
	permissions?: string[]
	user?: User
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		id: Identifier.type.optional(),
		name: isly.string(/.+/),
		permissions: isly.array(isly.string(/.+/)).optional(),
		user: User.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
