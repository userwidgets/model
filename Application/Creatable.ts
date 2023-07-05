import { isly } from "isly"
import { Organization } from "../Organization"
export interface Creatable {
	name: string
	permissions: string[]
	organizations: Record<Organization.Identifier, Organization>
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(/.+/),
		permissions: isly.array(isly.string(/.+/)),
		organizations: isly.record(Organization.Identifier.type, Organization.type),
	})
	export const is = type.is
	export const flaw = type.flaw
}
