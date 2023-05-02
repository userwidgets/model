import * as cryptly from "cryptly"
import { Password } from "./index"

describe("Password.something", () => {
	const password = "asd123"

	it("is", () => {
		expect(Password.is(password)).toEqual(true)
	})

	it("hash", async () => {
		const something = await Password.hash(
			password,
			"wqoqt5GIvLifneRu2bBCKCj_E1YRGDG1fME3SCfACD50pJ12b9dusb-RRpZI4H3gFRPedbobyVqMCjCfJPFWcC8Hzw3jIn4dh94JHp1SlkK3Sa6_Cb-T9lbIzadm7ruOFDx9wQoCsb4M0WMLzswGA1ZCvtaIrZNJz9jaOCTl-lFDBJU2B98Vabb2wtNNclhPX_hpamO3Qvh0BxKJKUWD4iO-nrX5NOndlFsr9PU9cFdga0Gt4Wi9rOIQy5L9pa3d"
		)

		expect(
			cryptly.Password.Hashed.is(something) &&
				(await Password.verify(
					password,
					something,
					"wqoqt5GIvLifneRu2bBCKCj_E1YRGDG1fME3SCfACD50pJ12b9dusb-RRpZI4H3gFRPedbobyVqMCjCfJPFWcC8Hzw3jIn4dh94JHp1SlkK3Sa6_Cb-T9lbIzadm7ruOFDx9wQoCsb4M0WMLzswGA1ZCvtaIrZNJz9jaOCTl-lFDBJU2B98Vabb2wtNNclhPX_hpamO3Qvh0BxKJKUWD4iO-nrX5NOndlFsr9PU9cFdga0Gt4Wi9rOIQy5L9pa3d"
				))
		).toEqual(true)
	})
})
