import { flagly } from "flagly"
import { isoly } from "isoly"
import { authly } from "authly"
import { isly } from "isly"
import { Creatable as KeyCreatable } from "./Creatable"
import { Transformer as KeyTransformer, transformers } from "./Transformers"

type BaseProperties = {
	issuer: string
	audience: string
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
}
type Base<
	K extends Key.Creatable.Properties = Key.Creatable.Properties,
	P extends flagly.Flags = flagly.Flags
> = BaseProperties & KeyCreatable<K, P>
export type Key<
	K extends Key.Creatable.Properties = Key.Creatable.Properties,
	P extends flagly.Flags = flagly.Flags
> = Base<K, P> & K
export namespace Key {
	export type Transformer = KeyTransformer
	export const Transformer = KeyTransformer
	export type Creatable<
		K extends KeyCreatable.Properties = KeyCreatable.Properties,
		P extends flagly.Flags = flagly.Flags
	> = KeyCreatable<K, P>
	export const Creatable = KeyCreatable
	export namespace Creatable {
		export type Properties = KeyCreatable.Properties
	}
	function createType<K extends Creatable.Properties, P extends flagly.Flags>(
		key: isly.Type<K>,
		permissions: isly.Type<P>
	): isly.Type<Key<K, P>> {
		return isly.intersection<Key<K, P>, K, Base<K, P>>(
			key,
			isly.intersection<Base<K, P>, Key.Creatable<K, P>, BaseProperties>(
				Key.Creatable.type.create(key, permissions),
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
	export const type = Object.assign(createType(Creatable.Properties.type, flagly.Flags.type), { create: createType })
	export const is = type.is
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

	export type Verifier<T extends Key> = authly.Verifier<T>
	export namespace Verifier {
		/**
		 * Creates a verifier.
		 * If no public key is provided, verifier skips verification and oly returns payload. Might be used on client-side.
		 */
		export function create<T extends Key>(publicKey?: string): Verifier<Key> {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return authly.Verifier.create<T>(...(publicKey ? [authly.Algorithm.RS256(publicKey)!] : [])).add(...transformers)
		}
	}
}
