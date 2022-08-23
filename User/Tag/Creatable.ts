export interface Creatable {
	email: string
	organizationId: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return typeof value == "object" && typeof value.email == "string" && typeof value.organizationId == "string"
	}
}
