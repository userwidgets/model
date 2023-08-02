import { isly } from "isly"
import { Identifier } from "../../Organization/Identifier"

export type Organization<T extends Record<string, unknown> = Record<string, unknown>> = {
	// users permissions on organization in current application
	[id: Identifier]:
		| ({
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
							edit?: true
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
				// extend with own resources with custom format
		  } & T)
		| true
		| undefined
}
export namespace Organization {
	function createType<T extends Record<string, unknown>>(
		type: isly.Type<T> = isly.record(isly.string(), isly.union(isly.undefined(), isly.unknown()))
	): isly.Type<Organization<T>> {
		return isly.record<Organization<T>>(
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
