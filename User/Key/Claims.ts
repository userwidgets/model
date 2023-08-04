import { authly } from "authly"
import { isly } from "isly"

type Claim = authly.Payload.Value
export type Claims = authly.Payload.Data
export namespace Claims {
	const value: isly.Type<Claim> = isly.union(isly.boolean(), isly.string(), isly.number())
	export const type: isly.Type<Claims> = isly.record<Claims>(
		isly.string(),
		isly.union(
			isly.lazy(() => Claims.type, "Claims"),
			value,
			isly.array(isly.lazy(() => Claims.type, "Claims")),
			isly.array(value),
			isly.undefined()
		)
	)
	export const is = type.is
	export const flaw = type.flaw
}
