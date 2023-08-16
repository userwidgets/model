import { isly } from "isly"
import { Email } from "../Email"
import type { Organization } from "./index"

// This is an object because it is going to have the invitees permissions on it as well.
// Permissions is being worked on in another branch and will be added by that branch when it merges

export interface Changeable {
	name?: Organization["name"]
	users?: (Email | Changeable.Invite)[]
	permissions?: Organization["permissions"]
}
export namespace Changeable {
	export interface Invite {
		user: Email
		//permissions
		permissions?: string[]
	}
	export namespace Invite {
		export const type = isly.object<Invite>({
			user: Email.type,
			//permissions
			permissions: isly.array(isly.string()).optional(),
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
