export interface Creatable {
	name: { first: string; last: string }
	email: string
	permissions: Record<"*", string> & Record<string /* organizationIds */, string | undefined>
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.email == "string" &&
			typeof value.name == "object" &&
			typeof value.name.first == "string" &&
			typeof value.name.last == "string" &&
			typeof value.permissions == "object" &&
			Object.keys(value.permissions).includes("*") &&
			Object.entries(value.permissions).every(([k, v]) => typeof k == "string" && typeof v == "string") &&
			Object.keys(value.permissions).includes("*")
		)
	}
}
