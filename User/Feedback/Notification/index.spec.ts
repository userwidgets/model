import * as gracely from "gracely"
import * as model from "../../../index"

describe("User.Feedback.Notification", () => {
	it("is", () => {
		let notification: model.User.Feedback.Notification = {
			email: "asd",
			response: gracely.client.notFound(),
		}
		expect(model.User.Feedback.Notification.is(notification)).toEqual(true)
		notification = { ...notification, response: { status: 200 } }
		expect(model.User.Feedback.Notification.is(notification)).toEqual(true)
		expect(model.User.Feedback.Notification.is(gracely.client.notFound())).toEqual(true)
	})
})
