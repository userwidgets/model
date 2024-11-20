import { isly } from "isly"
export interface Creatable {
	name: string
	selfSignOn?: boolean
	permissions?: string[]
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(/.+/),
		selfSignOn: isly.boolean(),
		permissions: isly.array(isly.string(/.+/)).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
