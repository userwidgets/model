import { isoly } from "isoly"
import { authly } from "authly"
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

export interface User<T extends authly.Payload.Data = authly.Payload.Data> extends Omit<User.Creatable, "password"> {
	permissions: User.Permissions<T>
	created: isoly.DateTime
	modified: isoly.DateTime
}

export namespace User {
	export type Permissions<T extends authly.Payload.Data = authly.Payload.Data> = UserPermissions<T>
	export const Permissions = UserPermissions
	export namespace Permissions {
		export type Organization<T extends authly.Payload.Data = authly.Payload.Data> = UserPermissions.Organization<T>
		export type Application<T extends authly.Payload.Data = authly.Payload.Data> = UserPermissions.Application<T>
	}
	export type Name = UserName
	export const Name = UserName
	export const type = isly.object<User>({
		email: Email.type,
		name: Name.type,
		permissions: Permissions.type,
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		modified: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Key<
		K extends authly.Payload.Data = authly.Payload.Data,
		P extends authly.Payload.Data = authly.Payload.Data
	> = UserKey<K, P>
	export const Key = UserKey
	export namespace Key {
		export type Issuer<T extends Key.Creatable> = UserKey.Issuer<T>
		export type Verifier<T extends Key> = UserKey.Verifier<T>
		export type Creatable<
			K extends authly.Payload.Data = authly.Payload.Data,
			P extends authly.Payload.Data = authly.Payload.Data
		> = UserKey.Creatable<K, P>
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
	export type Invite<T extends authly.Payload.Data = authly.Payload.Data> = UserInvite<T>
	export const Invite = UserInvite
	export namespace Invite {
		export type Creatable<T extends authly.Payload.Data = authly.Payload.Data> = UserInvite.Creatable<T>
		export type Issuer<T extends Invite.Creatable> = UserInvite.Issuer<T>
		export type Verifier<T extends Invite> = UserInvite.Verifier<T>
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
	export type Creatable<T extends authly.Payload.Data = authly.Payload.Data> = UserCreatable<T>
	export const Creatable = UserCreatable
	export type Changeable = UserChangeable
	export const Changeable = UserChangeable
}
