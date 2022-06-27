import * as isoly from "isoly"
import * as model from "../../model"

describe("Application", () => {
	it("is", () => {
		const application: model.Application = {
			id: "issuefabAppId",
			name: "Issuefab",
			organizations: {
				issuefabOrgId: {
					id: "issuefabOrgId",
					name: "Issuefab AB",
					users: ["johnny@app.com", "john@app.com", "richard@app.com"],
					modified: isoly.DateTime.now(),
				},
				paxportOrgId: {
					id: "paxportOrgId",
					name: "Paxport AB",
					users: ["john@app.com", "jane@app.com"],
					modified: isoly.DateTime.now(),
				},
			},
			permissions: "",
			modified: isoly.DateTime.now(),
		}
		expect(model.Application.is(application)).toEqual(true)
	})
})
