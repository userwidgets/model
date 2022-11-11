import type { Key } from "../Key"
import { Application } from "./Application"
import { Organization } from "./Organization"
import { Permission } from "./Permission"

export interface Readable {
	"*"?: Application | undefined
	[organizationId: string]: Organization | undefined
}

export namespace Readable {
	export function is(value: Readable | any): value is Readable {
		return (
			typeof value == "object" &&
			value &&
			Object.entries(value)
				.filter(([key, _]) => key != "*")
				.every(([_, value]) => Organization.is(value)) &&
			(value["*"] == undefined || Application.is(value["*"]))
		)
	}
	export function allowUpdate(key: Key, permissions: Readable): boolean {
		return Object.entries(permissions).every(
			([id, perms]) =>
				perms &&
				(key.permissions[id]?.organization?.write || key.permissions["*"]?.organization?.write) &&
				Object.entries(perms).every(
					([resource, permission]) =>
						permission &&
						Object.keys(permission).every(
							action =>
								key.permissions[id]?.[resource]?.[action as keyof Permission] ||
								key.permissions["*"]?.[resource]?.[action as keyof Permission]
						)
				)
		)
	}
	export function update(current: Readable, alter: Readable): Readable {
		Object.entries(alter).forEach(
			([id, permissions]) =>
				permissions &&
				Object.entries(permissions).forEach(
					([resource, permission]) =>
						permission &&
						((current[id] ?? (current[id] = {}))[resource] = { ...current[id]?.[resource], ...permission })
				)
		)
		return current
	}
}
