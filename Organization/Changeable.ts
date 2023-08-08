import { isly } from "isly"
import { Email } from "../Email"
import type { Organization } from "./index"

// This is an object because it is going to have the invitees permissions on it as well. 
// Permissions is being worked on in another branch and will be added by that branch when it merges
interface Invite {
	user: Email
	//permissions
}

export interface Changeable {
	name?: Organization["name"]
	users?: (Email | Invite)[]
	permissions?: Organization["permissions"]
}
export namespace Changeable {
	export const type = isly.object<Changeable>({
		name: isly.string(/.+/).optional(),
		permissions: isly.array(isly.string(/.+/)).optional(),
		users: isly.array(Email.type).optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
