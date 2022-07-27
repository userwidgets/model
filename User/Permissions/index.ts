import { Applications as PermissionsApplications } from "./Applications"
import { Collection as PermissionsCollection } from "./Collection"
import { Organizations as PermissionsOrganizations } from "./Organizations"
import { Permission as PermissionsPermission } from "./Permission"

export namespace Permissions {
	export type Applications = PermissionsApplications
	export const Applications = PermissionsApplications
	export type Collection = PermissionsCollection
	export const Collection = PermissionsCollection
	export type Organizations = PermissionsOrganizations
	export const Organizations = PermissionsOrganizations
	export type Permission = PermissionsPermission
	export const Permission = PermissionsPermission
}
