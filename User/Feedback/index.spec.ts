import * as gracely from "gracely"
import * as model from "../../index"

describe("User.Feedback", () => {
	it("is", () => {
		const notification: model.User.Feedback.Notification = {
			email: "asd",
			response: gracely.client.notFound(),
		}
		const invitation: model.User.Feedback.Invitation = {
			email: "asd",
			invite: "asd",
			response: gracely.client.notFound(),
		}
		let feedback: model.User.Feedback = notification
		expect(model.User.Feedback.is(feedback)).toEqual(true)
		feedback = invitation
		expect(model.User.Feedback.is(feedback)).toEqual(true)
		expect(model.User.Feedback.is(gracely.client.notFound())).toEqual(true)
		expect(model.User.Feedback.is({})).toEqual(false)
	})
})
