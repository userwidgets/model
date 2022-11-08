import * as gracely from "gracely"
import * as model from "../../../index"

describe("User.Feedback.Invitation.Invitation", () => {
	it("is", () => {
		let invitation: model.User.Feedback.Invitation.Interface = {
			email: "asd",
			tag: "asd",
			response: gracely.client.notFound(),
		}
		expect(model.User.Feedback.Invitation.Interface.is(invitation)).toEqual(true)
		expect(model.User.Feedback.Invitation.is(invitation)).toEqual(true)
		invitation = { ...invitation, response: { status: 200 } }
		expect(model.User.Feedback.Invitation.Interface.is(invitation)).toEqual(true)
		expect(model.User.Feedback.Invitation.is(invitation)).toEqual(true)
		expect(
			model.User.Feedback.Invitation.is(
				Object.fromEntries(Object.entries(invitation).filter(([property, _]) => property != "response"))
			)
		).toEqual(true)
	})
})
