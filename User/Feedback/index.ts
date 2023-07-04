import { isly } from "isly"
import { Invitation as FeedbackInvitation } from "./Invitation"
import { Notification as FeedbackNotification } from "./Notification"

export type Feedback = FeedbackInvitation | FeedbackNotification

export namespace Feedback {
	export const type = isly.union<Feedback, FeedbackInvitation, FeedbackNotification>(
		FeedbackInvitation.type,
		FeedbackNotification.type
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Invitation = FeedbackInvitation
	export const Invitation = FeedbackInvitation
	export namespace Invitation {
		export type Interface = FeedbackInvitation.Interface
	}
	export type Notification = FeedbackNotification
	export const Notification = FeedbackNotification
	export namespace Notification {
		export type Interface = FeedbackNotification.Interface
	}
}
