import { authly } from "authly"
import { isly } from "isly"

export type Application<T extends authly.Payload.Data = authly.Payload.Data> = {
	// permissions on current application user is logged into
	"*"?:
		| ({
				// administrative user resource permissions
				user?:
					| {
							// allow viewing users even outside of own orgs.
							view?: true
							// allow editing of all users this user can view
							edit?: true
							// allow invite of new users to all viewable orgs
							invite?: true
					  }
					| true
				// administrative organization resource permissions
				org?:
					| {
							// view all orgs across this app
							view?: true
							// allow editing of all orgs this user can view
							edit?: true
							// allow creation of new organizations to this app
							create?: true
					  }
					| true
				// maybe this is unnecessary as there is nothing implemented to support this.
				// skip for now and implement later if needed?
				app?: {
					// view all applications on userwidgets
					view?: true
					// edit all applications on userwidgets
					edit?: true
					// create new applications on userwidgets
					create?: true
				}
				//extend with custom resources with custom formats
		  } & T)
		| true
}
export namespace Application {
	export function createType<T extends authly.Payload.Data>(
		type: isly.Type<T> = isly.record(isly.string(), isly.undefined())
	): isly.Type<Application<T>> {
		return isly.record<Application<T>>(
			isly.string(),
			isly
				.union(
					isly.boolean(true),
					isly.intersection(
						type,
						isly.object({
							user: isly
								.union(
									isly.boolean(true),
									isly.object({
										view: isly.boolean(true).optional(),
										edit: isly.boolean(true).optional(),
										invite: isly.boolean(true).optional(),
									})
								)
								.optional(),
							org: isly
								.union(
									isly.boolean(true),
									isly.object({
										view: isly.boolean(true).optional(),
										edit: isly.boolean(true).optional(),
										create: isly.boolean(true).optional(),
									})
								)
								.optional(),
							app: isly
								.union(
									isly.boolean(true),
									isly.object({
										view: isly.boolean(true).optional(),
										edit: isly.boolean(true).optional(),
										create: isly.boolean(true).optional(),
									})
								)
								.optional(),
						})
					)
				)
				.optional()
		)
	}
	export const type = Object.assign(createType(), { create: createType })
}
