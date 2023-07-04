import { isoly } from "isoly"
import { isly } from "isly"
import { Creatable as ApplicationCreatable } from "./Creatable"
import { Identifier as ApplicationIdentifier } from "./Identifier"
export interface Application extends Application.Creatable {
	id: Application.Identifier
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace Application {
	export type Identifier = ApplicationIdentifier
	export const Identifier = ApplicationIdentifier
	export type Creatable = ApplicationCreatable
	export const Creatable = ApplicationCreatable
	export const type = Creatable.type.extend<Application>({
		id: Identifier.type,
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
}
