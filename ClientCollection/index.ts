import { isoly } from "isoly"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { Configuration } from "../Configuration"
import { Application as ClientApplication } from "./Application"
import { Me as ClientMe } from "./Me"
import { Organization as ClientOrganization } from "./Organization"
import { User as ClientUser } from "./User"

export interface EntityTags {
	application: Record<string, isoly.DateTime | undefined>
	organization: Record<string, isoly.DateTime | undefined>
	user: Record<string, isoly.DateTime | undefined>
}

/**
 * Collection of rest.Collections to talk to userwidgets-API:
 *
 * Is created with:
 * * new Client(httpClient)
 *
 * http.Clients that is NOT provided when constructing this object, can
 * be added with listenOnUnauthorized(...) to trigger login for those.
 * @param ..
 */
export class ClientCollection {
	private readonly allClients: http.Client[] = []
	readonly configuration: Configuration
	public constructor(
		private client: http.Client,
		configuration: Configuration.Required,
		...moreClients: http.Client[]
	) {
		if (configuration.application)
			client.appendHeader = request => ({ ...request.header, application: configuration.application })
		this.configuration = Configuration.addDefault(configuration)
		this.user = new ClientCollection.User(this.client, this.entityTags, this.configuration)
		this.me = new ClientCollection.Me(this.client, key => (this.key = key), this.configuration)
		this.organization = new ClientCollection.Organization(this.client, this.entityTags, this.configuration)
		this.application = new ClientCollection.Application(this.client, this.entityTags, this.configuration)
		;[client, ...moreClients].forEach(client => this.addClient(client))
	}
	#key: ClientCollection["key"]
	get key(): string | undefined {
		return this.#key
	}
	set key(key: ClientCollection["key"]) {
		this.#key = key
		this.allClients.forEach(client => (client.key = this.#key))
	}

	readonly entityTags: EntityTags = { application: {}, organization: {}, user: {} }

	readonly user: ClientCollection.User
	readonly me: ClientCollection.Me
	readonly organization: ClientCollection.Organization
	readonly application: ClientCollection.Application

	/** Set by UserWidgets Login-component */
	onUnauthorized?: () => Promise<boolean>
	private readonly onUnauthorizedCallback = async () => this.onUnauthorized?.() ?? false
	/**
	 * If it exists other Clients that should trigger login, register with this method.
	 */
	addClient(client: http.Client) {
		this.allClients.push(client)
		client.onUnauthorized = this.onUnauthorizedCallback
	}
}
export namespace ClientCollection {
	export type Application = ClientApplication
	export const Application = ClientApplication
	export type Organization = ClientOrganization
	export const Organization = ClientOrganization
	export type Me = ClientMe
	export const Me = ClientMe
	export type User = ClientUser
	export const User = ClientUser

	export type Unauthorized = (client: rest.Client<never>) => Promise<boolean>
}
