import * as gracely from "gracely"
import * as isoly from "isoly"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import type { userwidgets } from "../index"
import type { EntityTags } from "./index"

export class Organization extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly prefix: `/${string}` | "" = "") {
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
			`${this.prefix}/organization${url ? "?url=" + url : ""}`,
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
		const result = await this.client.get<userwidgets.Organization>(`${this.prefix}/organization/${organizationId}`)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async list(): Promise<userwidgets.Organization[] | gracely.Error> {
		const result = await this.client.get<userwidgets.Organization[]>(`${this.prefix}/organization`)
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
			`${this.prefix}/organization/${organizationId}/name`,
			organization,
			{
				...(entityTag && { ifMatch: [entityTag] }),
				application: applicationId,
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[result.id] = isoly.DateTime.now())
		return result
	}
	async removeUser(organizationId: string, email: string) {
		const entityTag = this.entityTags.organization[organizationId]
		const result = await this.client.delete<userwidgets.Organization>(
			`${this.prefix}/organization/${organizationId}/user/${email}`,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[organizationId] = isoly.DateTime.now())
		return result
	}
}
