import { flagly } from "flagly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Email } from "../Email"
import { Changeable as UserChangeable } from "./Changeable"
import { Creatable as UserCreatable } from "./Creatable"
import { Credentials as UserCredentials } from "./Credentials"
import { Feedback as UserFeedback } from "./Feedback"
import { Invite as UserInvite } from "./Invite"
import { Key as UserKey } from "./Key"
import { Name as UserName } from "./Name"
import { Password as UserPassword } from "./Password"
import { Permissions as UserPermissions } from "./Permissions"

export interface User<T extends flagly.Flags = flagly.Flags> extends Omit<User.Creatable<T>, "password"> {
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace User {
	export type Permissions<T extends flagly.Flags = flagly.Flags> = UserPermissions<T>
	export const Permissions = UserPermissions
	export namespace Permissions {
		export type Organization<T extends flagly.Flags = flagly.Flags> = UserPermissions.Organization<T>
		export type Application<T extends flagly.Flags = flagly.Flags> = UserPermissions.Application<T>
		export type Readable<T extends flagly.Flags = flagly.Flags> = Permissions<T>
	}
	export type Name = UserName
	export const Name = UserName
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<User<T>> {
		return isly.object<User<T>>({
			email: Email.type,
			name: Name.type,
			permissions: Permissions.type.create(type),
			created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
			modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		})
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw

	export const toKey = UserKey.Creatable.from
	export type Key<
		C extends UserKey.Creatable.Claims = UserKey.Creatable.Claims,
		P extends flagly.Flags = flagly.Flags
	> = UserKey<C, P>
	export const Key = UserKey
	export namespace Key {
		export type Issuer<T extends Key.Creatable = Key.Creatable> = UserKey.Issuer<T>
		export type Verifier<T extends Key = Key> = UserKey.Verifier<T>
		export type Creatable<
			C extends UserKey.Creatable.Claims = UserKey.Creatable.Claims,
			P extends flagly.Flags = flagly.Flags
		> = UserKey.Creatable<C, P>
		export namespace Creatable {
			export type Claims = UserKey.Creatable.Claims
		}
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
	export type Invite<T extends flagly.Flags = flagly.Flags> = UserInvite<T>
	export const Invite = UserInvite
	export namespace Invite {
		export type Creatable<T extends flagly.Flags = flagly.Flags> = UserInvite.Creatable<T>
		export type Issuer<T extends Invite.Creatable = Invite.Creatable> = UserInvite.Issuer<T>
		export type Verifier<T extends Invite = Invite> = UserInvite.Verifier<T>
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
	export type Creatable<T extends flagly.Flags = flagly.Flags> = UserCreatable<T>
	export const Creatable = UserCreatable
	export type Changeable = UserChangeable
	export const Changeable = UserChangeable
	// Readable only for backwards compatibility
	export type Readable<T extends flagly.Flags = flagly.Flags> = User<T>
	export namespace Readable {
		export const is = type.is
	}
}
