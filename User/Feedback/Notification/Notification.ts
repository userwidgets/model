import { gracely } from "gracely"
import { http } from "cloudly-http"
import { isly } from "isly"
import { Email } from "../../../Email"
export interface Notification {
	email: Email
	response?: http.Response | gracely.Result
}

export namespace Notification {
	export const type = isly.object<Notification>({
		email: Email.type,
		response: isly
			.union(isly.fromIs("http.Response", http.Response.is), isly.fromIs("gracely.Error", gracely.Result.is))
			.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
