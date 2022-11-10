import * as isoly from "isoly"
import { Creatable as UserCreatable } from "./Creatable"
import { Credentials as UserCredentials } from "./Credentials"
import { Feedback as UserFeedback } from "./Feedback"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"
import { Readable as ReadableUser } from "./Readable"
import { Tag as UserTag } from "./Tag"

export interface User extends Omit<UserCreatable, "password" | "permissions"> {
	permissions: UserPermissions
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace User {
	export function is(value: User | any): value is User & Record<string, any> {
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
		export const isIssuer = UserKey.isIssuer
		export const unpack = UserKey.unpack
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
	export type Tag = UserTag
	export namespace Tag {
		export type Issuer = UserTag.Issuer
		export type Verifier = UserTag.Verifier
		export const is = UserTag.is
		export const unpack = UserTag.unpack
		export const Issuer = UserTag.Issuer
		export const Verifier = UserTag.Verifier
		export type Creatable = UserTag.Creatable
		export const Creatable = UserTag.Creatable
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
