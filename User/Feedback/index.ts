import { Invitation as FeedbackInvitation } from "./Invitation"
import { Notification as FeedbackNotification } from "./Notification"

export type Feedback = FeedbackInvitation | FeedbackNotification

export namespace Feedback {
	export function is(value: Feedback | any): value is Feedback {
		return Invitation.is(value) || Notification.is(value)
	}
	export type Invitation = FeedbackInvitation
	export namespace Invitation {
		export const is = FeedbackInvitation.is
		export type Interface = FeedbackInvitation.Interface
		export const Interface = FeedbackInvitation.Interface
	}
	export type Notification = FeedbackNotification
	export namespace Notification {
		export const is = FeedbackNotification.is
		export type Interface = FeedbackNotification.Interface
		export const Interface = FeedbackNotification.Interface
	}
}
