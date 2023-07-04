import { gracely } from "gracely"
import { Invitation as InvitationInterface } from "./Invitation"

export type Invitation = InvitationInterface | gracely.Error
export namespace Invitation {
	export function is(value: Invitation | any): value is Invitation {
		return InvitationInterface.is(value) || gracely.Error.is(value)
	}
	export type Interface = InvitationInterface
	export const Interface = InvitationInterface
}
