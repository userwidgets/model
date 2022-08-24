import { Name } from "../Name"
import { Password } from "../Password"

export interface Register {
	user: string
	name: Name
	password: Password.Set
}

export namespace Register {
	export function is(value: Register | any): value is Register & Record<string, any> {
		return (
			typeof value == "object" &&
			typeof value.user == "string" &&
			Name.is(value.name) &&
			Password.Set.is(value.password)
		)
	}
}
