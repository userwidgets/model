import { Organization } from "./Organization"

describe("Permissions.Organization", () => {
	it("is", () => {
		expect(Organization.type.is({})).toEqual(true)
	})
	it("temp", () => {
		const t: Organization = { whatever: {} }
		console.log(Organization.type.is(t))
	})
})
