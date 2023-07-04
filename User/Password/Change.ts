import { isly } from "isly"
import { Set } from "./Set"
export interface Change extends Set {
	old: string
}

export namespace Change {
	export const type = Set.type.extend<Change>({
		old: isly.string(/.+/),
	})
	export const is = type.is
	export const flaw = type.flaw

	export async function validate(value: Change): Promise<boolean> {
		return Set.validate(value) && value.new != value.old
	}
}
