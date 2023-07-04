import { isoly } from "isoly"
import { isly } from "isly"
import { Email } from "../Email"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Creatable as OrganizationCreatable } from "./Creatable"
import { Identifier as OrganizationIdentifier } from "./Identifier"

export interface Organization extends Omit<OrganizationCreatable, "users"> {
	id: Organization.Identifier
	created: isoly.DateTime
	modified: isoly.DateTime
	users: Email[]
}

export namespace Organization {
	export type Identifier = OrganizationIdentifier
	export const Identifier = OrganizationIdentifier
	export type Creatable = OrganizationCreatable
	export const Creatable = OrganizationCreatable
	export type Changeable = OrganizationChangeable
	export const Changeable = OrganizationChangeable
	export const type = isly.object<Organization>({
		id: Identifier.type,
		name: isly.string(/.+/),
		permissions: isly.array(isly.string(/.+/)),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		users: isly.array(Email.type),
	})
	export const is = type.is
	export const flaw = type.flaw
}
