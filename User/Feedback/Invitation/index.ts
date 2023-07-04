import { gracely } from "gracely"
import { isly } from "isly"
import { Invitation as InvitationInterface } from "./Invitation"

export type Invitation = InvitationInterface | gracely.Error
export namespace Invitation {
	export const type = isly.union<Invitation, InvitationInterface, gracely.Error>(
		InvitationInterface.type,
		isly.fromIs("gracely.Error", gracely.Error.is)
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Interface = InvitationInterface
	export const Interface = InvitationInterface
}
