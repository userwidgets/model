import * as gracely from "gracely"
import * as http from "cloudly-http"

export interface Invitation {
	email: string
	tag: string
	response?: http.Response | gracely.Result
}

export namespace Invitation {
	export function is(value: Invitation | any): value is Invitation {
		return (
			typeof value == "object" &&
			value &&
			typeof value.email == "string" &&
			typeof value.tag == "string" &&
			(gracely.Result.is(value.response) || http.Response.is(value.response) || value.response == undefined)
		)
	}
}
