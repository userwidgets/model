import * as gracely from "gracely"
import * as http from "cloudly-http"

export interface Invitation {
	email: string
	invite: string
	response?: http.Response | gracely.Result
}

export namespace Invitation {
	export const type = isly.object<Invitation>({})
	export function is(value: Invitation | any): value is Invitation {
		return (
			typeof value == "object" &&
			value &&
			typeof value.email == "string" &&
			typeof value.invite == "string" &&
			(gracely.Result.is(value.response) || http.Response.is(value.response) || value.response == undefined)
		)
	}
}
