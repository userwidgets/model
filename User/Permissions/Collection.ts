import { isly } from "isly"
import { Permission } from "./Permission"

export type Collection = Record<string /* resource */, Permission | undefined>
export namespace Collection {
	export const type = isly.record<Collection>(isly.string(), Permission.type.optional())
	export const is = type.is
}
