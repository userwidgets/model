import { Organization } from "./Organization"

describe("Permissions.Organization", () => {
	it("temp", () => {
		const t: Organization = { whatever: {} }
		console.log(Organization.type.is(t))
	})
})
