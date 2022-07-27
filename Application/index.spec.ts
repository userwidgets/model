import * as isoly from "isoly"
import * as model from "../index"

describe("Application", () => {
	it("is", () => {
		const application: model.Application = {
			id: "exampleAppId",
			name: "example",
			organizations: {
				exampleOrgId: {
					id: "exampleOrgId",
					name: "Example AB",
					users: ["johnny@app.com", "john@app.com", "richard@app.com"],
					modified: isoly.DateTime.now(),
					permissions: ["organization", "user"],
				},
				acmeOrgId: {
					id: "acmeOrgId",
					name: "Acme AB",
					users: ["john@app.com", "jane@app.com"],
					modified: isoly.DateTime.now(),
					permissions: ["organization", "user"],
				},
			},
			permissions: ["application", "organization", "user", "custom"],

			modified: isoly.DateTime.now(),
		}
		expect(model.Application.is(application)).toEqual(true)
	})
})
