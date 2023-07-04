import { gracely } from "gracely"
import { http } from "cloudly-http"
import { isly } from "isly"
import { Email } from "../../../Email"

export interface Invitation {
	email: Email
	invite: string
	response?: http.Response | gracely.Result
}

export namespace Invitation {
	export const type = isly.object<Invitation>({
		email: Email.type,
		invite: isly.string(/.+/),
		response: isly
			.union(isly.fromIs("http.Response", http.Response.is), isly.fromIs("gracely.Result", gracely.Result.is))
			.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
