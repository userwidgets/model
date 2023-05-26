import { Set } from "./Set"
export interface Change extends Set {
	old: string
}

export namespace Change {
	export const type = isly.object<Change>({})
	export function is(value: Change | any): value is Change {
		return Set.is(value) && "old" in value && typeof value.old == "string"
	}

	export async function validate(value: Change): Promise<boolean> {
		return Set.validate(value) && value.new != value.old
	}
}
