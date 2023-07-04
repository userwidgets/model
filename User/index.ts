import { isoly } from "isoly"
import { isly } from "isly"
import type { Application } from "../Application"
import { Email } from "../Email"
import type { Organization } from "../Organization"
import { Changeable as UserChangeable } from "./Changeable"
import { Creatable as UserCreatable } from "./Creatable"
import { Credentials as UserCredentials } from "./Credentials"
import { Feedback as UserFeedback } from "./Feedback"
import { Invite as UserInvite } from "./Invite"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"
import { Readable as ReadableUser } from "./Readable"

export interface User extends Omit<User.Creatable, "password" | "permissions"> {
	permissions: User.Permissions
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace User {
	export type Name = UserName
	export const Name = UserName
	export const type = isly.object<User>({
		email: Email.type,
		name: Name.type,
		permissions: isly.fromIs("Permissions", UserPermissions.is),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function toKey(
		user: User,
		application: Application.Identifier,
		organizations?: Organization.Identifier[]
	): UserKey.Creatable | undefined {
		const permissions = user.permissions[application]
		return !permissions
			? undefined
			: {
					email: user.email,
					name: user.name,
					permissions: {
						...(organizations
							? Object.fromEntries(
									Object.entries(permissions).filter(([organization, _]) => organizations.includes(organization))
							  )
							: user.permissions[application]),
						"*": permissions["*"],
					},
			  }
	}
	export type Key = UserKey
	export const Key = UserKey
	export namespace Key {
		export type Issuer = UserKey.Issuer
		export type Verifier = UserKey.Verifier
		export type Creatable = UserKey.Creatable
	}

	export type Credentials = UserCredentials
	export const Credentials = UserCredentials
	export namespace Credentials {
		export type Register = UserCredentials.Register
	}
	export type Password = UserPassword
	export const Password = UserPassword
	export namespace Password {
		export type Change = UserPassword.Change
		export type Set = UserPassword.Set
	}
	export type Invite = UserInvite
	export const Invite = UserInvite
	export namespace Invite {
		export type Issuer = UserInvite.Issuer
		export type Verifier = UserInvite.Verifier
		export type Creatable = UserInvite.Creatable
	}
	export type Permissions = UserPermissions
	export const Permissions = UserPermissions
	export namespace Permissions {
		export type Application = UserPermissions.Application
		export type Collection = UserPermissions.Collection
		export type Organization = UserPermissions.Organization
		export type Permission = UserPermissions.Permission
		export type Readable = UserPermissions.Readable
	}
	export type Feedback = UserFeedback
	export const Feedback = UserFeedback
	export namespace Feedback {
		export type Invitation = UserFeedback.Invitation
		export namespace Invitation {
			export type Interface = UserFeedback.Invitation.Interface
		}
		export type Notification = UserFeedback.Notification
		export namespace Notification {
			export type Interface = UserFeedback.Notification.Interface
		}
	}
	export type Creatable = UserCreatable
	export const Creatable = UserCreatable
	export type Changeable = UserChangeable
	export const Changeable = UserChangeable
	export type Readable = ReadableUser
	export const Readable = ReadableUser
}
