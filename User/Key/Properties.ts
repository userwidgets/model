import { authly } from "authly"
import { isly } from "isly"

type Property = authly.Payload.Value
export type Properties = authly.Payload.Data
console.log("properties")
export namespace Properties {
	const value: isly.Type<Property> = isly.union(isly.boolean(), isly.string(), isly.number())
	export const type: isly.Type<Properties> = isly.record<Properties>(
		isly.string(),
		isly.union(
			isly.lazy(() => {
				console.log("1")
				return Properties.type
			}, "Properties"),
			value,
			isly.array(
				isly.lazy(() => {
					console.log("2")
					return Properties.type
				}, "Properties")
			),
			isly.array(value),
			isly.undefined()
		)
	)
}
