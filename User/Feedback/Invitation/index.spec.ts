import * as gracely from "gracely"
import * as model from "../../../index"

describe("User.Feedback.Invitation", () => {
	it("is", () => {
		let invitation: model.User.Feedback.Invitation = {
			email: "asd",
			invite: "asd",
			response: gracely.client.notFound(),
		}
		expect(model.User.Feedback.Invitation.is(invitation)).toEqual(true)
		invitation = { ...invitation, response: { status: 200 } }
		expect(model.User.Feedback.Invitation.is(invitation)).toEqual(true)
		expect(model.User.Feedback.Invitation.is(gracely.client.notFound())).toEqual(true)
	})
})
