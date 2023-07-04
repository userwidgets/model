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
	async changeName(
		id: userwidgets.Organization.Identifier,
		organization: userwidgets.Organization.Creatable,
		application: userwidgets.Application.Identifier
	): Promise<userwidgets.Organization | gracely.Error> {
		const entityTag = this.entityTags.organization[id]
		const result = await this.client.put<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${id}/name`,
			organization,
			{ ...(entityTag && { ifMatch: [entityTag] }), application }
		)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async addUsers(id: userwidgets.Organization.Identifier, users: userwidgets.Email[], url?: string) {
		const result = await this.client.patch<userwidgets.User.Feedback.Invitation[] | gracely.Error>(
			`${this.configuration.pathPrefix}/organization/user/${id}${url ? "?url=" + url : ""}`,
			users
		)
		if (!gracely.Error.is(rest))
			this.entityTags.organization[id] = isoly.DateTime.now()
		return result
	}
	async removeUser(id: userwidgets.Organization.Identifier, email: userwidgets.Email) {
		const entityTag = this.entityTags.organization[id]
		const result = await this.client.delete<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${id}/user/${email}`,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[id] = isoly.DateTime.now())
		return result
	}
}
