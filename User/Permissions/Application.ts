import { flagly } from "flagly"
import { isly } from "isly"

type Base = {
	// permissions on current application user is logged into
	// administrative user resource permissions
	user?:
		| {
				// allow viewing users even outside of own orgs.
				view?: true
				// allow editing of all users this user can view
				admin?: true
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
	app?:
		| {
				// view all applications on userwidgets
				view?: true
				// edit all applications on userwidgets
				edit?: true
				// create new applications on userwidgets
				create?: true
		  }
		| true
	//extend with custom resources with custom formats
}
export type Application<T extends flagly.Flags = flagly.Flags> = T & Base

export namespace Application {
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<Application<T>> {
		return isly.intersection<Application<T>, T, Base>(
			type,
			isly.object({
				user: isly.union(
					isly.boolean(true),
					isly.undefined(),
					isly.object({
						view: isly.boolean(true).optional(),
						edit: isly.boolean(true).optional(),
						invite: isly.boolean(true).optional(),
					})
				),
				org: isly.union(
					isly.boolean(true),
					isly.undefined(),
					isly.object({
						view: isly.boolean(true).optional(),
						edit: isly.boolean(true).optional(),
						create: isly.boolean(true).optional(),
					})
				),
				app: isly.union(
					isly.boolean(true),
					isly.undefined(),
					isly.object({
						view: isly.boolean(true).optional(),
						edit: isly.boolean(true).optional(),
						create: isly.boolean(true).optional(),
					})
				),
			})
		)
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
	export const flags = [
		"user.view",
		"user.admin",
		"user.invite",
		"org.view",
		"org.edit",
		"org.create",
		"app.view",
		"app.edit",
		"app.create",
	] as const
}
