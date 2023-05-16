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
	pathPrefix: "" | `/${string}`
	inviteParameterName: string
}

export namespace Configuration {
	export type Required = Partial<Configuration>
	export function addDefault(configuration: Required): Configuration {
		return {
			pathPrefix: "",
			inviteParameterName: "invite",
			...configuration,
		}
	}
}
