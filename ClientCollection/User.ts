import { gracely } from "gracely"
import { isoly } from "isoly"
import { http } from "cloudly-http"
import { rest } from "cloudly-rest"
import { userwidgets } from "../index"
import type { EntityTags } from "./index"

export class User extends rest.Collection<gracely.Error> {
	constructor(client: http.Client, readonly entityTags: EntityTags, readonly configuration: userwidgets.Configuration) {
		super(client)
	}
	async list(): Promise<userwidgets.User[] | gracely.Error> {
		const result = await this.client.get<userwidgets.User[]>(`${this.configuration.pathPrefix}/user`)
		!gracely.Error.is(result) &&
			result.forEach(user => ((this.entityTags.user[user.email] = isoly.DateTime.now()), this.entityTags))
		return result
	}
	async update(
		email: userwidgets.Email,
		user: userwidgets.User.Changeable,
		options?: { entityTag?: string }
	): Promise<userwidgets.User | gracely.Error> {
		const entityTag = options?.entityTag ?? this.entityTags.user[email]
		const result = await this.client.patch<userwidgets.User | gracely.Error>(
			`${this.configuration.pathPrefix}/user/${email}`,
			user,
			{
				...(entityTag && { ifMatch: [entityTag] }),
			}
		)
		return result
	}
	async remove2fa(email: userwidgets.Email): Promise<userwidgets.User | gracely.Error> {
		return await this.client.delete<userwidgets.User | gracely.Error>(
			`${this.configuration.pathPrefix}/user/${email}/2fa`
		)
	}
}
