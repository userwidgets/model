import { isly } from "isly"

export interface Unauthenticated {
	status: 400
	type: "malformed header"
	content: {
		header: "authorization-2fa"
		description: string
	}
}

export namespace Unauthenticated {
	export const type = isly.object<Unauthenticated>({
		status: isly.number(400),
		type: isly.string("malformed header"),
		content: isly.object({ header: isly.string("authorization-2fa"), description: isly.string() }),
	})

	export const is = type.is
	export const flaw = type.flaw
}
