import * as isoly from "isoly"
import { Creatable as UserCreatable } from "./Creatable"
import { Credentials as UserCredentials } from "./Credentials"
import { Feedback as UserFeedback } from "./Feedback"
import { Invite as UserInvite } from "./Invite"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"
import { Readable as ReadableUser } from "./Readable"

export interface User extends Omit<UserCreatable, "password" | "permissions"> {
	permissions: UserPermissions
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace User {
	export const type = isly.object<User>({})
	export function is(value: User | any): value is User {
		return (
			typeof value == "object" &&
			value &&
			typeof value.email == "string" &&
			UserName.is(value.name) &&
			isoly.DateTime.is(value.created) &&
			isoly.DateTime.is(value.modified) &&
			UserPermissions.is(value.permissions)
		)
	}
	export function toKey(user: User, applicationId: string, organizationIds?: string[]): UserKey.Creatable | undefined {
		const permissions = user.permissions[applicationId]
		return !permissions
			? undefined
			: {
					email: user.email,
					name: user.name,
					permissions: {
						...(organizationIds
							? Object.fromEntries(
									Object.entries(permissions).filter(([organizationId, _]) => organizationIds.includes(organizationId))
							  )
							: user.permissions[applicationId]),
						"*": permissions["*"],
					},
			  }
	}
	export type Name = UserName
	export const Name = UserName
	export type Key = UserKey
	export namespace Key {
		export const is = UserKey.is
		export type Issuer = UserKey.Issuer
		export const Issuer = UserKey.Issuer
		export type Verifier = UserKey.Verifier
		export const Verifier = UserKey.Verifier
		export type Creatable = UserKey.Creatable
		export const Creatable = UserKey.Creatable
	}

	export type Credentials = UserCredentials
	export namespace Credentials {
		export const is = UserCredentials.is
		export const fromBasic = UserCredentials.fromBasic
		export const toBasic = UserCredentials.toBasic
		export type Register = UserCredentials.Register
		export namespace Register {
			export const is = UserCredentials.Register.is
			export const validate = UserCredentials.Register.validate
		}
	}
	export type Password = UserPassword
	export namespace Password {
		export const is = UserPassword.is
		export type Change = UserPassword.Change
		export const Change = UserPassword.Change
		export type Set = UserPassword.Set
		export const Set = UserPassword.Set
	}
	export type Invite = UserInvite
	export namespace Invite {
		export type Issuer = UserInvite.Issuer
		export type Verifier = UserInvite.Verifier
		export const is = UserInvite.is
		export const Issuer = UserInvite.Issuer
		export const Verifier = UserInvite.Verifier
		export type Creatable = UserInvite.Creatable
		export const Creatable = UserInvite.Creatable
	}
	export type Permissions = UserPermissions
	export namespace Permissions {
		export const is = UserPermissions.is
		export type Application = UserPermissions.Application
		export const Application = UserPermissions.Application
		export type Collection = UserPermissions.Collection
		export const Collection = UserPermissions.Collection
		export type Organization = UserPermissions.Organization
		export const Organization = UserPermissions.Organization
		export type Permission = UserPermissions.Permission
		export const Permission = UserPermissions.Permission
		export type Readable = UserPermissions.Readable
		export const Readable = UserPermissions.Readable
	}
	export type Feedback = UserFeedback
	export namespace Feedback {
		export const is = UserFeedback.is
		export type Invitation = UserFeedback.Invitation
		export namespace Invitation {
			export const is = UserFeedback.Invitation.is
			export type Interface = UserFeedback.Invitation.Interface
			export const Interface = UserFeedback.Invitation.Interface
		}
		export type Notification = UserFeedback.Notification
		export namespace Notification {
			export const is = UserFeedback.Notification.is
			export type Interface = UserFeedback.Notification.Interface
			export const Interface = UserFeedback.Notification.Interface
		}
	}
	export type Creatable = UserCreatable
	export const Creatable = UserCreatable
	export type Readable = ReadableUser
	export const Readable = ReadableUser
}
