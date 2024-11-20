import { isoly } from "isoly"
import { isly } from "isly"
import { Email } from "../Email"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Creatable as OrganizationCreatable } from "./Creatable"
import { Identifier as OrganizationIdentifier } from "./Identifier"

export interface Organization extends Omit<Organization.Creatable, "permissions" | "user"> {
	id: Organization.Identifier
	users: Email[]
	permissions: string[]
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace Organization {
	export type Identifier = OrganizationIdentifier
	export const Identifier = OrganizationIdentifier
	export type Creatable = OrganizationCreatable
	export const Creatable = OrganizationCreatable
	export type Changeable = OrganizationChangeable
	export const Changeable = OrganizationChangeable
	export namespace Changeable {
		export type Invite = OrganizationChangeable.Invite
	}
	export const type = Creatable.type.omit(["permissions", "id", "user"]).extend<Organization>({
		id: Identifier.type,
		users: isly.array(Email.type),
		permissions: isly.array(isly.string(/.+/)),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
