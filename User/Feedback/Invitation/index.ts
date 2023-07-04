import { gracely } from "gracely"
import { isly } from "isly"
import { Invitation as InvitationInterface } from "./Invitation"

export type Invitation = Invitation.Interface | gracely.Error
export namespace Invitation {
	export type Interface = InvitationInterface
	export const Interface = InvitationInterface
	export const type = isly.union<Invitation, Interface, gracely.Error>(
		InvitationInterface.type,
		isly.fromIs("gracely.Error", gracely.Error.is)
	)
	export const is = type.is
	export const flaw = type.flaw
}
