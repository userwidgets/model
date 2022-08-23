import * as isoly from "isoly"
import * as model from "../index"

describe("Application", () => {
	const now = isoly.DateTime.now()
	it("is", () => {
		const application: model.Application = {
			id: "exampleAppId",
			name: "example",
			organizations: {
				exampleOrgId: {
					id: "exampleOrgId",
					name: "Example AB",
					users: ["johnny@app.com", "john@app.com", "richard@app.com"],
					created: now,
					modified: now,
					permissions: ["organization", "user"],
				},
				acmeOrgId: {
					id: "acmeOrgId",
					name: "Acme AB",
					users: ["john@app.com", "jane@app.com"],
					created: now,
					modified: now,
					permissions: ["organization", "user"],
				},
			},
			permissions: ["application", "organization", "user", "custom"],
			created: now,
			modified: now,
		}
		expect(model.Application.is(application)).toEqual(true)
	})
})
