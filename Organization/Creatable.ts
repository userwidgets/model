import { isly } from "isly"
import { Email } from "../Email"
import { Identifier } from "./Identifier"
export interface Creatable {
	id?: Identifier
	name: string
	permissions?: string[]
	user?: Email
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		id: Identifier.type.optional(),
		name: isly.string(/.+/),
		permissions: isly.array(isly.string(/.+/)).optional(),
		user: Email.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
