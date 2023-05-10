import * as gracely from "gracely"
import { isoly } from "isoly"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
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
 * Client to talk to userwidget-API:
 *
 * Can be created with:
 * * Client.create()
 * * new Client(httpClient)
 *
 * This class can be extended to add more properties.
 *
 * http.Clients that is NOT provided when constructing this object, can
 * be added with listenOnUnauthorized(...) to trigger login for those.
 */
export class Client extends rest.Client<gracely.Error> {
	entityTags: EntityTags = { application: {}, organization: {}, user: {} }
	readonly user = new Client.User(this.client, this.entityTags, this.userwidgetPrefix)
	readonly me = new Client.Me(this.client, this.userwidgetPrefix)
	readonly organization = new Client.Organization(this.client, this.entityTags, this.userwidgetPrefix)
	readonly application = new Client.Application(this.client, this.entityTags, this.userwidgetPrefix)
	static createUsingHttpClient(httpClient: http.Client) {
		return new this(httpClient)
	}
	public constructor(httpClient: http.Client, readonly userwidgetPrefix: `/${string}` | "" = "") {
		super(httpClient)
	}
	static create<T = Record<string, any>, Error = never>(
		url?: string,
		key?: string,
		load?: (connection: http.Client) => T
	): Client & T {
		const client = new http.Client<Error>(url, key)
		const result = new this(client)
		if (load)
			Object.assign(result, load(client))
		return result as Client & T
	}
	/** Set by UserWidgets Login-component */
	onUnauthorized?: () => Promise<boolean>
	/**
	 * If it exists other Clients that should trigger login, register with this method.
	 */
	listenOnUnauthorized(client: http.Client) {
		client.onUnauthorized = async () => !!this.onUnauthorized && this.onUnauthorized()
	}
}
export namespace Client {
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
