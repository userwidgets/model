import { gracely } from "gracely"
import { http } from "cloudly-http"
import * as rest from "cloudly-rest"
import type { userwidgets } from "../../index"

export class Invite extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly configuration: userwidgets.Configuration) {
		super(client)
	}
	async fetch(id: string): Promise<string | gracely.Error> {
		return this.client.get<string>(`${this.configuration.pathPrefix}/me/invite${id}`)
	}
}
