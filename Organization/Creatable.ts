import { flagly } from "flagly"
import { authly } from "authly"
import { isly } from "isly"
import { Email } from "../Email"
import { Identifier } from "./Identifier"
export interface Creatable {
	id?: Identifier
	name: string
	permissions?: string[]
	users: {
		email: Email
		permissions?: { "*"?: string[] | true; organization?: string[] | true }
	}[]
}

export namespace Creatable {
	function createType<T extends flagly.Flags = flagly.Flags>(type: isly.Type<T>): isly.Type<Creatable> {
		return isly.object<Creatable>({
			id: Identifier.type.optional(),
			name: isly.string(/.+/),
			permissions: isly.array(isly.string(/.+/)).optional(),
			users: isly.array(
				isly.object({
					email: Email.type,
					permissions: isly
						.object<Exclude<Creatable["users"][number]["permissions"], undefined>>({
							"*": isly.union(isly.array(isly.string()), isly.boolean(true)).optional(),
							organization: isly.union(isly.array(isly.string()), isly.boolean(true)).optional(),
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
