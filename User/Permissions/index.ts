import { isly } from "isly"
import { Application as PermissionsApplication } from "./Application"
import { Collection as PermissionsCollection } from "./Collection"
import { Organization as PermissionsOrganization } from "./Organization"
import { Permission as PermissionsPermission } from "./Permission"
import { Readable as PermissionsReadable } from "./Readable"

export interface Permissions {
	[applicationId: string]: Permissions.Readable | undefined
}

export namespace Permissions {
	export const type = isly.record<Permissions>(isly.string(), Permissions.Readable.type)
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
