import * as isoly from "isoly"
import { Credentials as UserCredentials } from "./Credentials"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"

export interface User {
	email: string
	name: UserName
	permissions: {
		applications: Record<string /* applicationId */, UserPermissions | undefined>
		organizations: Record<string /* organizationId */, UserPermissions | undefined>
	}
	modified: isoly.DateTime
}

export namespace User {
	export function is(value: User | any): value is User & Record<string, any> {
		return (
			typeof value == "object" &&
			UserName.is(value.name) &&
			typeof value.permissions == "object" &&
			typeof value.permissions.applications == "object" &&
			typeof value.permissions.organizations == "object" &&
			Object.values(value.permissions.applications).every(permissions => UserPermissions.is(permissions)) &&
			Object.values(value.permissions.organizations).every(permissions => UserPermissions.is(permissions)) &&
			isoly.DateTime.is(value.modified)
		)
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
	export type Permissions = UserPermissions
	export namespace Permissions {
		export const is = UserPermissions.is
		export type Permission = UserPermissions.Permission
		export const Permission = UserPermissions.Permission
	}
}
