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
		applicationId: string,
		url?: string
	): Promise<
		| gracely.Error
		| { organization: gracely.Error }
		| { organization: userwidgets.Organization; feedback: userwidgets.User.Feedback[] | gracely.Error }
	> {
		const result = await this.client.post<Awaited<ReturnType<Organization["create"]>>>(
			`${this.configuration.pathPrefix}/organization${url ? "?url=" + url : ""}`,

			organization,
			{
				application: applicationId,
			}
		)
		!gracely.Error.is(result) &&
			!gracely.Error.is(result.organization) &&
			(this.entityTags.organization[result.organization.id] = isoly.DateTime.now())
		return result
	}
	async fetch(organizationId: string): Promise<userwidgets.Organization | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${organizationId}`
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
		organizationId: string,
		organization: userwidgets.Organization.Creatable,
		applicationId: string
	): Promise<userwidgets.Organization | gracely.Error> {
		const entityTag = this.entityTags.organization[organizationId]
		const result = await this.client.put<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${organizationId}/name`,
			organization,
			{
				...(entityTag && { ifMatch: [entityTag] }),
				application: applicationId,
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async addUsers(organizationId: string, users: string[], url?: string) {
		const result = await this.client.patch<userwidgets.User.Feedback.Invitation[] | gracely.Error>(
			`${this.configuration.pathPrefix}/organization/user/${organizationId}${url ? "?url=" + url : ""}`,
			users
		)
		if (!gracely.Error.is(rest))
			this.entityTags.organization[organizationId] = isoly.DateTime.now()
		return result
	}
	async removeUser(organizationId: string, email: string) {
		const entityTag = this.entityTags.organization[organizationId]
		const result = await this.client.delete<userwidgets.Organization>(
			`${this.configuration.pathPrefix}/organization/${organizationId}/user/${email}`,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[organizationId] = isoly.DateTime.now())
		return result
	}
}
