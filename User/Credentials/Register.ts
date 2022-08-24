import { Password } from "../Password"

export interface Register {
	user: string
	password: Password.Set
}

export namespace Register {
	export function is(value: Register | any): value is Register & Record<string, any> {
		return typeof value.user == "string" && Password.Set.is(value.password)
	}
}
