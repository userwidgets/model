import { gracely } from "gracely"
import { isly } from "isly"
import { Notification as NotificationInterface } from "./Notification"

export type Notification = NotificationInterface | gracely.Error

export namespace Notification {
	export const type = isly.union<Notification, NotificationInterface, gracely.Error>(
		NotificationInterface.type,
		isly.fromIs("gracely.Error", gracely.Error.is)
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Interface = NotificationInterface
	export const Interface = NotificationInterface
}
