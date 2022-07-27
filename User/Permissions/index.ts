import { Application as PermissionsApplication } from "./Application"
import { Collection as PermissionsCollection } from "./Collection"
import { Organization as PermissionsOrganization } from "./Organization"
import { Permission as PermissionsPermission } from "./Permission"

export namespace Permissions {
	export type Application = PermissionsApplication
	export const Application = PermissionsApplication
	export type Collection = PermissionsCollection
	export const Collection = PermissionsCollection
	export type Organization = PermissionsOrganization
	export const Organization = PermissionsOrganization
	export type Permission = PermissionsPermission
	export const Permission = PermissionsPermission
}
