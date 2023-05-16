import * as gracely from "gracely"
import * as isoly from "isoly"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Configuration, userwidgets } from "../index"
import type { EntityTags } from "./index"

export class Application extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly configuration: Configuration) {
		super(client)
	}
	async create(application: userwidgets.Application.Creatable): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.post<userwidgets.Application>(
			`${this.configuration.pathPrefix}/application`,
			application
		)
		!gracely.Error.is(result) && (this.entityTags.application[result.id] = isoly.DateTime.now())
		return result
	}
	async fetch(): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.get<userwidgets.Application>(`${this.configuration.pathPrefix}/application`)
		!gracely.Error.is(result) && (this.entityTags.application[result.id] = isoly.DateTime.now())
		return result
	}
}
