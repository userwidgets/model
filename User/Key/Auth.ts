import * as isoly from "isoly"

export interface Auth {
	issuer: string
	audience: string
	expires: string
	name: { first: string; last: string }
	email: string
	id: string
}

export namespace Auth {
	export function is(value: Auth | any): value is Auth & Record<string, any> {
		return (
			typeof value.issuer == "string" &&
			typeof value.audience == "string" &&
			isoly.DateTime.is(value.issued) &&
			isoly.DateTime.is(value.expires) &&
			typeof value.email == "string" &&
			typeof value.name == "object" &&
			typeof value.name.first == "string" &&
			typeof value.name.last == "string" &&
			typeof value.id == "string"
		)
	}
}
