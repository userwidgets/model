import * as isoly from "isoly"
import { Creatable as CreatableApplication } from "./Creatable"

export interface Application extends CreatableApplication {
	id: string
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace Application {
	export function is(value: Application | any): value is Application & Record<string, any> {
		return (
			Creatable.is(value) &&
			typeof value.id == "string" &&
			isoly.DateTime.is(value.created) &&
			isoly.DateTime.is(value.modified)
		)
	}
	export type Creatable = CreatableApplication
	export const Creatable = CreatableApplication
}
