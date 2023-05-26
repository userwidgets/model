import { Name } from "../Name"
import { Password } from "../Password"

export interface Register {
	user: string
	name: Name
	password: Password.Set
}

export namespace Register {
	export const type = isly.object<Register>({})
	export function is(value: Register | any): value is Register {
		return (
			typeof value == "object" &&
			typeof value.user == "string" &&
			Name.is(value.name) &&
			Password.Set.is(value.password)
		)
	}
	export function validate(credentials: Register): boolean {
		return Password.Set.validate(credentials.password)
	}
}
