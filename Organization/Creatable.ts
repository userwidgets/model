export interface Creatable {
	name: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return typeof value == "object" && typeof value.name == "string"
	}
}
