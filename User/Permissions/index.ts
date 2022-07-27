import { Permission as PermissionsPermission } from "./Permission"

export type Permissions = Record<string /* resource */, PermissionsPermission | undefined>
export namespace Permissions {
	export function is(value: Permissions | any): value is Permissions & Record<string, any> {
		return typeof value == "object" && Object.values(value).every(permission => Permission.is(permission))
	}
	export type Permission = PermissionsPermission
	export const Permission = PermissionsPermission
}
