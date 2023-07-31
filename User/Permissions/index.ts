import { Organization } from "../../Organization"
import { Application as PermissionsApplication } from "./Application"
import { Collection as PermissionsCollection } from "./Collection"
import { Organization as PermissionsOrganization } from "./Organization"
import { Permission as PermissionsPermission } from "./Permission"
import { Readable as PermissionsReadable } from "./Readable"
// extensive
type Permissions = {
	// users permissions on organization in current application
	[id: Organization["id"]]:
		| {
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
		  }
		| undefined
} & {
	// permissions on current application user is logged into
	"*"?: {
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
	}
}

// minimal
// description of permissions exists in the long version
/*
type Permissions = {
	[id: Organization.Identifier]: {
		user?: {
			invite?: true
		}
		org?:
			| {
					edit?: true
			  }
			| true
	}
} & {
	"*": {
		user?:
			| {
					view?: true
					edit?: true
					invite?: true
			  }
			| true
		org?:
			| {
					view?: true
					edit?: true
					create?: true
			  }
			| true
	}
}
*/
// export interface Permissions {
// 	[applicationId: string]: Permissions.Readable | undefined
// }

export namespace Permissions {
	export function is(value: Permissions | any): value is Permissions {
		return typeof value == "object" && value && Object.values(value).every(permissions => Readable.is(permissions))
	}
	export type Application = PermissionsApplication
	export const Application = PermissionsApplication
	export type Collection = PermissionsCollection
	export const Collection = PermissionsCollection
	export type Organization = PermissionsOrganization
	export const Organization = PermissionsOrganization
	export type Permission = PermissionsPermission
	export const Permission = PermissionsPermission
	export type Readable = PermissionsReadable
	export const Readable = PermissionsReadable
}
