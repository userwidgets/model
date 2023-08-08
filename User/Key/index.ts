import { flagly } from "flagly"
import { isoly } from "isoly"
import { authly } from "authly"
import { isly } from "isly"
import { Creatable as KeyCreatable } from "./Creatable"
import { Transformer as KeyTransformer, transformers } from "./Transformers"

type BaseClaims = {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
}
type Base<C extends Key.Creatable.Claims = Key.Creatable.Claims, P extends flagly.Flags = flagly.Flags> = BaseClaims &
	KeyCreatable<C, P>
export type Key<C extends Key.Creatable.Claims = Key.Creatable.Claims, P extends flagly.Flags = flagly.Flags> = Base<
	C,
	P
> &
	C
export namespace Key {
	export type Transformer = KeyTransformer
	export const Transformer = KeyTransformer
	export type Creatable<
		C extends KeyCreatable.Claims = KeyCreatable.Claims,
		P extends flagly.Flags = flagly.Flags
	> = KeyCreatable<C, P>
	export const Creatable = KeyCreatable
	export namespace Creatable {
		export type Claims = KeyCreatable.Claims
	}
	function createType<C extends Creatable.Claims, P extends flagly.Flags>({
		claims: key = Creatable.Claims.type as isly.Type<C>,
		permissions = flagly.Flags.type as isly.Type<P>,
	}: {
		claims?: isly.Type<C>
		permissions?: isly.Type<P>
	} = {}): isly.Type<Key<C, P>> {
		return isly.intersection<Key<C, P>, C, Base<C, P>>(
			key,
			isly.intersection<Base<C, P>, Key.Creatable<C, P>, BaseClaims>(
				Key.Creatable.type.create({ claims: key, permissions }),
				isly.object({
					issuer: isly.string(),
					audience: isly.string(),
					issued: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
					expires: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
					token: isly.string(/^[^.]+\.[^.]+\.[^.]*/),
				})
			)
		)
	}
	export const type = Object.assign(createType(), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
	export type Issuer<T extends Key.Creatable> = authly.Issuer<T>
	export namespace Issuer {
		export function create<T extends Key.Creatable>(
			issuer: string,
			audience: string,
			publicKey: string,
			privateKey: string
		): Issuer<T> {
			return Object.assign(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				authly.Issuer.create<T>(issuer, authly.Algorithm.RS256(publicKey, privateKey)!).add(...transformers),
				{ audience, duration: 60 * 60 * 12 }
			)
		}
	}

	export type Verifier<T extends Key = Key> = authly.Verifier<T>
	export namespace Verifier {
		/**
		 * Creates a verifier.
		 * If no public key is provided, verifier skips verification and oly returns payload. Might be used on client-side.
		 */
		export function create<T extends Key>(publicKey?: string): Verifier<T> {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return authly.Verifier.create<T>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(...transformers)
		}
	}
}
