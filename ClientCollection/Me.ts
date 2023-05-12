import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { User } from "../User"

export class Me extends rest.Collection<gracely.Error> {
	constructor(
		client: http.Client,
		private keySetter: (key: string | undefined) => void,
		readonly prefix: `/${string}` | "" = ""
	) {
		super(client)
	}
	async login(credentials: User.Credentials): Promise<User.Key | gracely.Error> {
		let result: gracely.Error | User.Key
		if (credentials.password == undefined)
			result = gracely.client.malformedContent("password", "string", "Password is required for login.")
		else {
			const token = await this.client.get<string>(`${this.prefix}/me`, {
				authorization: User.Credentials.toBasic({ user: credentials.user, password: credentials.password }),
			})
			result = gracely.Error.is(token)
				? token
				: (await User.Key.unpack(token)) ?? gracely.client.unauthorized("Failed to verify token.")
			if (!gracely.Error.is(result))
				this.keySetter(result.token)
		}
		return result
	}
	async register(tag: User.Tag, credentials: User.Credentials.Register): Promise<User.Key | gracely.Error> {
		const token = await this.client.post<string>(`${this.prefix}/me/${tag.token}`, credentials)
		const result = gracely.Error.is(token)
			? token
			: (await User.Key.unpack(token)) ?? gracely.client.unauthorized("Failed to verify token.")
		if (!gracely.Error.is(result))
			this.keySetter(result.token)
		return result
	}
	async join(tag: User.Tag): Promise<User.Key | gracely.Error> {
		const response = await this.client.patch<string>(`${this.prefix}/me/${tag.token}`, undefined)
		const result = gracely.Error.is(response)
			? response
			: (await User.Key.unpack(response)) ?? gracely.client.unauthorized("Failed to verify token.")
		if (!gracely.Error.is(result))
			this.keySetter(result.token)
		return result
	}
}
