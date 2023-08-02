import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import type { userwidgets } from "../index"
import type { EntityTags } from "./index"

export class Organization extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly configuration: userwidgets.Configuration) {
		super(client)
	}
	async create(
		organization: userwidgets.Organization.Creatable,
		application: userwidgets.Application.Identifier,
		url?: string
	): Promise<
		| gracely.Error
		| { organization: gracely.Error }
		| { organization: userwidgets.Organization; feedback: userwidgets.User.Feedback[] | gracely.Error }
	> {
		const result = await this.client.post<Awaited<ReturnType<Organization["create"]>>>(
			`${this.configuration.pathPrefix}/organization${url ? "?url=" + url : ""}`,
			organization,
			{ application }
		)
		!gracely.Error.is(result) &&
			!gracely.Error.is(result.organization) &&
			(this.entityTags.organization[result.organization.id] = isoly.DateTime.now())
		return result
	}
	async fetch(id: userwidgets.Organization.Identifier): Promise<userwidgets.Organization | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${id}`
		)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async list(): Promise<userwidgets.Organization[] | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization[]>(`${this.configuration.pathPrefix}/organization`)
		!gracely.Error.is(result) &&
			result.reduce(
				(entityTags, organization) => ((entityTags.organization[organization.id] = isoly.DateTime.now()), entityTags),
				this.entityTags
			)
		return result
	}
	async update(
		id: userwidgets.Organization.Identifier,
		organization: userwidgets.Organization.Changeable,
		application: userwidgets.Application.Identifier
	): Promise<
		| gracely.Error
		| { organization: gracely.Error }
		| {
				organization: userwidgets.Organization
				invites: userwidgets.User.Feedback.Invitation[]
				removals: userwidgets.User.Feedback.Notification[]
		  }
	> {
		const entityTag = this.entityTags.organization[id]
		const result = await this.client.patch<
			| { organization: gracely.Error }
			| {
					organization: userwidgets.Organization
					invites: userwidgets.User.Feedback.Invitation[]
					removals: userwidgets.User.Feedback.Notification[]
			  }
		>(`${this.configuration.pathPrefix}/organization/${id}`, organization, {
			...(entityTag && { ifMatch: [entityTag] }),
			application,
		})
		!gracely.Error.is(result) && (this.entityTags.organization[id] = isoly.DateTime.now())
		return result
	}
}
