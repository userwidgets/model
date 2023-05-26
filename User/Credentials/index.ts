import * as authly from "authly"
import { Register as CredentialsRegister } from "./Register"

export interface Credentials {
	user: string
	password: string
}

export namespace Credentials {
	export const type = isly.object<any>({})
	export function is(value: any | Credentials): value is Credentials {
		return (
			typeof value == "object" && typeof value.user == "string" && value.user != "" && typeof value.password == "string"
		)
	}
	export function fromBasic(login: string | undefined): Credentials | undefined {
		let result: Credentials | undefined
		if (login && login.substring(0, 6).toLowerCase() == "basic ") {
			const data = new authly.TextDecoder().decode(authly.Base64.decode(login.substring(6), "standard")).split(":")
			result = data.length == 2 ? { user: data[0], password: data[1] } : undefined
		}
		return result
	}
	export function toBasic(credentials: Credentials): string {
		return `Basic ${authly.Base64.encode(
			new authly.TextEncoder().encode(credentials.user + ":" + credentials.password),
			"standard",
			"="
		)}`
	}
	export type Register = CredentialsRegister
	export const Register = CredentialsRegister
}
