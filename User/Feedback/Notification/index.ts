import { gracely } from "gracely"
import { Notification as NotificationInterface } from "./Notification"

export type Notification = NotificationInterface | gracely.Error

export namespace Notification {
	export function is(value: Notification | any): value is Notification {
		return NotificationInterface.is(value) || gracely.Error.is(value)
	}
	export type Interface = NotificationInterface
	export const Interface = NotificationInterface
}
