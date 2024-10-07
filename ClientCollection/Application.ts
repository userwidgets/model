import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { userwidgets } from "../index"
import type { EntityTags } from "./index"

export class Application extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly configuration: userwidgets.Configuration) {
		super(client)
	}
	async create(application: userwidgets.Application.Creatable): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.post<userwidgets.Application>(
			`${this.configuration.pathPrefix}/application`,
			application
		)
		if (!gracely.Error.is(result))
			this.entityTags.application[result.id] = isoly.DateTime.now()
		return result
	}
	async fetch(): Promise<userwidgets.Application | gracely.Error> {
		const result = await this.client.get<userwidgets.Application>(`${this.configuration.pathPrefix}/application`)
		if (!gracely.Error.is(result))
			this.entityTags.application[result.id] = isoly.DateTime.now()
		return result
	}
}
