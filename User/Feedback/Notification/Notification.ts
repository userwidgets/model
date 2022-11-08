import * as gracely from "gracely"
import * as http from "cloudly-http"

export interface Notification {
	email: string
	response?: http.Response | gracely.Result
}

export namespace Notification {
	export function is(value: Notification | any): value is Notification {
		return (
			typeof value == "object" &&
			value &&
			typeof value.email == "string" &&
			(gracely.Result.is(value.response) || http.Response.is(value.response) || value.response == undefined)
		)
	}
}
