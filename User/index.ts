import * as isoly from "isoly"
import { Credentials as UserCredentials } from "./Credentials"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"

export interface User {
	email: string
	name: UserName
	permissions: Record<
		string /* applicationId */,
		Record<"*", UserPermissions.Application> &
			Record<Exclude<string, "*"> /* organizationId */, UserPermissions.Organization | undefined>
	>
	modified: isoly.DateTime
}

export namespace User {
	export function is(value: User | any): value is User & Record<string, any> {
		return (
			typeof value == "object" &&
			value &&
			UserName.is(value.name) &&
			typeof value.permissions == "object" &&
			Object.values(value.permissions).every(
				(application: any) =>
					typeof application == "object" &&
					UserPermissions.Application.is(application?.["*"]) &&
					Object.entries(application)
						.filter(([id, _]) => id != "*")
						.every(([_, organization]) => UserPermissions.Organization.is(organization))
			) &&
			isoly.DateTime.is(value.modified)
		)
	}
	export function toKey(user: User, applicationId: string, organizationIds?: string[]): UserKey.Creatable | undefined {
		return !user.permissions[applicationId]
			? undefined
			: {
					email: user.email,
					name: user.name,
					permissions: {
						...(organizationIds
							? (Object.fromEntries(
									Object.entries(user.permissions[applicationId]).filter(([organizationId, _]) =>
										organizationIds.includes(organizationId)
									)
							  ) as Record<"*", UserPermissions.Application> &
									Record<string, UserPermissions.Organization | undefined>)
							: user.permissions[applicationId]),
						"*": user.permissions[applicationId]["*"],
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
		export type Verifier = UserKey.Verifier
		export namespace Unsigned {
			export const Issuer = UserKey.Unsigned.Issuer
			export const Verifier = UserKey.Unsigned.Verifier
		}
		export namespace Signed {
			export const Issuer = UserKey.Signed.Issuer
			export const Verifier = UserKey.Signed.Verifier
		}
		export type Creatable = UserKey.Creatable
		export const Creatable = UserKey.Creatable
	}

	export type Credentials = UserCredentials
	export const Credentials = UserCredentials
	export type Password = UserPassword
	export namespace Password {
		export const is = UserPassword.is
		export type Change = UserPassword.Change
		export const Change = UserPassword.Change
		export type Set = UserPassword.Set
		export const Set = UserPassword.Set
	}
	export namespace Permissions {
		export type Application = UserPermissions.Application
		export const Application = UserPermissions.Application
		export type Collection = UserPermissions.Collection
		export const Collection = UserPermissions.Collection
		export type Organization = UserPermissions.Organization
		export const Organization = UserPermissions.Organization
		export type Permission = UserPermissions.Permission
		export const Permission = UserPermissions.Permission
	}
}
