import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import type { userwidgets } from "../index"
import { Organization as userwidgetsOrganization } from "../Organization"
import type { EntityTags } from "./index"

export class Organization extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly configuration: userwidgets.Configuration) {
		super(client)
	}
	async create(
		organization: userwidgets.Organization.Creatable,
		application: userwidgets.Application.Identifier,
		url?: string
	): Promise<userwidgets.Organization | gracely.Error> {
		const result = await this.client.post<Awaited<ReturnType<Organization["create"]>>>(
			`${this.configuration.pathPrefix}/organization${url ? "?url=" + url : ""}`,
			organization,
			{ application }
		)
		if (userwidgetsOrganization.is(result))
			this.entityTags.organization[result.id] = isoly.DateTime.now()
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
		url?: string,
		options?: { entityTag?: string }
	): Promise<
		| gracely.Error
		| { organization: gracely.Error }
		| {
				organization: userwidgets.Organization
				invites: userwidgets.User.Feedback.Invitation[]
				removals: userwidgets.User.Feedback.Notification[]
		  }
	> {
		const entityTag = options?.entityTag ?? this.entityTags.organization[id]
		const search = url ? new URLSearchParams([["url", url]]).toString() : undefined
		const result = await this.client.patch<ReturnType<Organization["update"]>>(
			`${this.configuration.pathPrefix}/organization/${id}` + (search ? `?${search}` : ""),
			organization,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		!gracely.Error.is(result) && (this.entityTags.organization[id] = isoly.DateTime.now())
		return result
	}
}
