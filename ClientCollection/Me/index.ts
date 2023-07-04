import { gracely } from "gracely"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { userwidgets } from "../../index"
import { User } from "../../User"
import { Invite } from "./Invite"

export class Me extends rest.Collection<gracely.Error> {
	readonly invite = new Invite(this.client, this.configuration)
	constructor(
		client: http.Client,
		private keySetter: (key: string | undefined) => void,
		readonly configuration: userwidgets.Configuration
	) {
		super(client)
	}
	async login(credentials: User.Credentials): Promise<User.Key | gracely.Error> {
		let result: gracely.Error | User.Key
		if (credentials.password == undefined)
			result = gracely.client.malformedContent("password", "string", "Password is required for login.")
		else {
			const token = await this.client.get<string>(`${this.configuration.pathPrefix}/me`, {
				authorization: User.Credentials.toBasic({ user: credentials.user, password: credentials.password }),
			})
			result = gracely.Error.is(token)
				? token
				: (await User.Key.Verifier.create(this.configuration.publicKey).verify(token)) ??
				  gracely.client.unauthorized("Failed to verify token.")
			if (!gracely.Error.is(result))
				this.keySetter(result.token)
		}
		return result
	}
	async register(invite: User.Invite, credentials: User.Credentials.Register): Promise<User.Key | gracely.Error> {
		const token = await this.client.post<string>(`${this.configuration.pathPrefix}/me/${invite.token}`, credentials)
		const result = gracely.Error.is(token)
			? token
			: (await User.Key.Verifier.create(this.configuration.publicKey).verify(token)) ??
			  gracely.client.unauthorized("Failed to verify token.")
		if (!gracely.Error.is(result))
			this.keySetter(result.token)
		return result
	}
	async join(invite: User.Invite): Promise<User.Key | gracely.Error> {
		const response = await this.client.patch<string>(`${this.configuration.pathPrefix}/me/${invite.token}`, undefined)
		const result = gracely.Error.is(response)
			? response
			: (await User.Key.Verifier.create(this.configuration.publicKey).verify(response)) ??
			  gracely.client.unauthorized("Failed to verify token.")
		if (!gracely.Error.is(result))
			this.keySetter(result.token)
		return result
	}
}
