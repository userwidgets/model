import { isly } from "isly"
import { Email } from "../Email"
import type { Organization } from "./index"

export interface Changeable {
	name?: Organization["name"]
	users?: (Email | Changeable.Invite)[]
	permissions?: Organization["permissions"]
}
export namespace Changeable {
	export interface Invite {
		user: Email
		permissions?: string
	}
	export namespace Invite {
		export const type = isly.object<Invite>({
			user: Email.type,
			permissions: isly.string().optional(),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.object<Changeable>({
		name: isly.string(/.+/).optional(),
		permissions: isly.array(isly.string(/.+/)).optional(),
		users: isly.array(isly.union(Invite.type, Email.type)).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
