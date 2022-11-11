import * as cryptly from "cryptly"
import * as gracely from "gracely"
import type { Password } from "./index"
import { Set } from "./Set"
export interface Change extends Set {
	old: string
}

export namespace Change {
	export function is(value: Change | any): value is Change & Record<string, any> {
		return Set.is(value) && typeof value.old == "string"
	}

	export async function verify(
		password: Password | Change,
		hash: cryptly.Password.Hash,
		hashSecret?: string
	): Promise<boolean | gracely.Error> {
		return hashSecret
			? await cryptly.Password.verify(
					cryptly.Signer.create("HMAC", "SHA-512", hashSecret),
					hash,
					typeof password == "string" ? password : password.old
			  )
			: gracely.server.misconfigured("hashSecret", "hashSecret is not set in worker environment")
	}

	export async function validate(value: Change, hash: cryptly.Password.Hash, hashSecret?: string): Promise<boolean> {
		return Set.validate(value) && (await verify(value, hash, hashSecret)) && value.new != value.old
	}
}
