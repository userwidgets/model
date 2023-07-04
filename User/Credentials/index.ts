import * as authly from "authly"
import { isly } from "isly"
import { Email } from "../../Email"
import { Register as CredentialsRegister } from "./Register"

export interface Credentials {
	user: Email
	password: string
}

export namespace Credentials {
	export const type = isly.object<Credentials>({
		user: Email.type,
		password: isly.string(/.+/),
	})
	export const is = type.is
	export const flaw = type.flaw

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
