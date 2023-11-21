export interface Configuration {
	/**
	 * This public key is used be the client.
	 * If not present, no verification of the signature on jwt:s is done.
	 * (Which is fine)
	 */
	publicKey?: string
	/**
	 * E.g `${pathPrefix}/me`
	 * Default:
	 */
	application?: string
	pathPrefix: "" | `/${string}`
	inviteParameterName: string
}

export namespace Configuration {
	export type Required = Partial<Configuration>
	export function addDefault(configuration: Required): Configuration
	export function addDefault<K extends keyof Configuration>(
		configuration: Required,
		...property: K[]
	): Pick<Configuration, K>
	export function addDefault(configuration: Required, ...properties: (keyof Configuration)[]): Partial<Configuration> {
		const defaultConfiguration: Configuration = {
			pathPrefix: "",
			inviteParameterName: "invite",
		}
		return Object.fromEntries(
			(properties.length > 0 ? properties : (["publicKey", "pathPrefix", "inviteParameterName"] as const)).map(
				property => [property, configuration[property] ?? defaultConfiguration[property]]
			)
		)
	}
}
