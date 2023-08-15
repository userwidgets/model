import { flagly } from "flagly"
import { isly } from "isly"

type Base = {
	// users permissions on organization in current application
	// user resource permissions for this organization
	user?:
		| {
				// allow viewing users in this orgs.
				// should this just be the default always?
				view?: true
				// allow editing users in this orgs.
				// OBS! These changes will reflect across all orgs!
				// maybe should not exist
				// maybe password change?
				admin?: true
				// allow invite of new users to this org.
				invite?: true
		  }
		| true
	// organization resource permissions for this organization
	org?:
		| {
				// allow viewing of all details of this org.
				// this would mostly include viewing available permissions?
				// maybe this is unnecessary and should come from having edit on this level
				view?: true
				// allow editing details of this org
				// includes removing users. should removing user be another permission?
				edit?: true
		  }
		| true
	app?: flagly.Flags | boolean
	//extend with custom resources with custom formats
}
export type Organization<T extends flagly.Flags = flagly.Flags> = Base & T
export namespace Organization {
	function createType<T extends flagly.Flags>(type: isly.Type<T>): isly.Type<Organization<T>> {
		return isly.intersection<Organization<T>, T, Base>(
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
					})
				),
				app: isly.union(flagly.Flags.type, isly.boolean()).optional(),
			})
		)
	}
	export const type = Object.assign(createType(flagly.Flags.type), { create: createType })
	export const is = type.is
	export const flaw = type.flaw
	// test this
	export const flags = ["user.view", "user.admin", "user.invite", "org.view", "org.edit"] as const
}
