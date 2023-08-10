import { isoly } from "isoly"
import { isly } from "isly"
import { Organization } from "../Organization"
import { Changeable as ApplicationChangeable } from "./Changeable"
import { Creatable as ApplicationCreatable } from "./Creatable"
import { Identifier as ApplicationIdentifier } from "./Identifier"
export interface Application extends Omit<Application.Creatable, "permissions"> {
	id: Application.Identifier
	permissions: string[]
	organizations: Record<Organization.Identifier, Organization>
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace Application {
	export type Identifier = ApplicationIdentifier
	export const Identifier = ApplicationIdentifier
	export type Creatable = ApplicationCreatable
	export const Creatable = ApplicationCreatable
	export const Changeable = ApplicationChangeable
	export type Changeable = ApplicationChangeable
	export const type = isly.object<Application>({
		id: Identifier.type,
		name: isly.string(),
		organizations: isly.record(Organization.Identifier.type, Organization.type),
		permissions: isly.array(isly.string()),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
