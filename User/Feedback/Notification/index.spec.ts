import { gracely } from "gracely"
import { userwidgets } from "../../../index"

describe("User.Feedback.Notification", () => {
	it("is", () => {
		let notification: userwidgets.User.Feedback.Notification = {
			email: "user@app.com",
			response: gracely.client.notFound(),
		}
		expect(userwidgets.User.Feedback.Notification.is(notification)).toEqual(true)
		notification = { ...notification, response: { status: 200 } }
		expect(userwidgets.User.Feedback.Notification.is(notification)).toEqual(true)
		expect(userwidgets.User.Feedback.Notification.is(gracely.client.notFound())).toEqual(true)
	})
})
