import { Application } from "./Application"
import { Organization } from "./Organization"

export interface Readable {
	"*"?: Application | undefined
	[organizationId: string]: Organization | undefined
}

export namespace Readable {
	export function is(value: Readable | any): value is Readable {
		return (
			typeof value == "object" &&
			value &&
			Object.entries(value)
				.filter(([key, _]) => key != "*")
				.every(([_, value]) => Organization.is(value)) &&
			(value["*"] == undefined || Application.is(value["*"]))
		)
	}
}
