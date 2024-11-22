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
	export import Identifier = ApplicationIdentifier
	export import Creatable = ApplicationCreatable
	export import Changeable = ApplicationChangeable
	export const type = Creatable.type.omit(["permissions"]).extend<Application>({
		id: Identifier.type,
		permissions: isly.array(isly.string()),
		organizations: isly.record(Organization.Identifier.type, Organization.type),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
