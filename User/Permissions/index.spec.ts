import { flagly } from "flagly"
import { isly } from "isly"
import { userwidgets } from "../../index"

describe("User.Permissions", () => {
	it("is", () => {
		const permissions: userwidgets.User.Permissions = {
			"*": { app: true, user: true, garbage: true },
			"---o1---": { user: true },
			"---o2---": { foo: { bar: { baz: false } } },
		}
		expect(userwidgets.User.Permissions.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.is({})).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "*": { app: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "*": { app: false } })).toEqual(false)
		expect(userwidgets.User.Permissions.is({ "---o1---": { app: true } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "---o1---": { app: false } })).toEqual(true)
		expect(userwidgets.User.Permissions.is({ "---o1---": { user: { view: true, garbage: true } } })).toEqual(true)
	})
	it("custom", () => {
		type Flags = { foo: { view: boolean } }
		type Permissions = userwidgets.User.Permissions<Flags>
		const permissionsType = isly.object<Flags>({
			foo: isly.object({ view: isly.boolean() }),
		})
		const type = userwidgets.User.Permissions.type.create(permissionsType)
		const permissions: Permissions = {
			"*": { foo: { view: false } },
			"o--o1--o": { foo: { view: true } },
		}
		expect(type.is(permissions)).toEqual(true)
		expect(userwidgets.User.Permissions.is(permissions)).toEqual(true)
	})
	it("check", () => {
		expect(userwidgets.User.Permissions.check("a1b2c3d4", {})).toEqual(true)
		expect(userwidgets.User.Permissions.check("a1b2c3d4", "")).toEqual(true)
		expect(
			userwidgets.User.Permissions.check(
				{
					"8fWbwNUM": { view: true, invite: true },
					"6RIwQSRP": { user: { view: true, invite: true }, org: true },
				},
				"6RIwQSRP",
				"org.edit"
			)
		).toEqual(true)
		expect(userwidgets.User.Permissions.check({ "*": true, a1b2c3d4: true }, "a1b2c3d4", "org.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check({ "*": true, a1b2c3d4: true }, "*", "user.read")).toEqual(true)
		const permissions: userwidgets.User.Permissions = {
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { view: true, admin: true } },
		}
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "*", "user.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "*", "user.admin")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.admin")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "org.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "org.edit")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.admin", "org.view")).toEqual(true)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4", "user.admin", "org.edit")).toEqual(false)
		expect(userwidgets.User.Permissions.check(permissions, "a1b2c3d4")).toEqual(false)
		expect(userwidgets.User.Permissions.check("a1b2c3d4", "a1b2c3d4")).toEqual(true)
		expect(userwidgets.User.Permissions.check("a1b2c3d4.user.view", "a1b2c3d4")).toEqual(false)
	})
	it("get", () => {
		const permissions = "*.user.view id.org.edit id.org.view"
		expect(userwidgets.User.Permissions.get(permissions, "*")).toEqual("*.user.view")
		expect(userwidgets.User.Permissions.get(permissions, "id")).toEqual("id.org.edit id.org.view")
	})
	it("remove", () => {
		expect(userwidgets.User.Permissions.remove("acme.user.view +---o1---.user.view", "acme", false)).toEqual(
			"+---o1---.user.view"
		)
		const permissions: userwidgets.User.Permissions = {
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { view: true, admin: true } },
		}
		expect(userwidgets.User.Permissions.remove(permissions, "a1b2c3d4", ["user.view"])).toEqual({
			"*": { user: { view: true }, org: { view: true } },
			a1b2c3d4: { user: { admin: true } },
		})
		expect(userwidgets.User.Permissions.remove(permissions, "a1b2c3d4", ["user"])).toEqual({
			"*": { user: { view: true }, org: { view: true } },
		})
		expect(userwidgets.User.Permissions.remove(permissions, "*", ["user", "org"])).toEqual({
			a1b2c3d4: { user: { view: true, admin: true } },
		})
		expect(userwidgets.User.Permissions.remove(permissions, "a1b2c3d4", [])).toEqual({
			"*": { user: { view: true }, org: { view: true } },
		})
		expect(userwidgets.User.Permissions.remove(permissions, "*", [])).toEqual({
			a1b2c3d4: { user: { view: true, admin: true } },
		})
		const partial = userwidgets.User.Permissions.remove(permissions, "*", [])
		if (partial == undefined) {
			expect(partial).not.toEqual(undefined)
			return
		}
		expect(userwidgets.User.Permissions.remove(partial, "a1b2c3d4", ["user.view", "user.admin"])).toEqual({})
	})
	it("set", () => {
		const permissions: userwidgets.User.Permissions<flagly.Flags> = {
			a1b2c3d4: { user: { view: true } },
		}
		expect(userwidgets.User.Permissions.set(permissions, "a1b2c3d4", true)).toEqual({
			a1b2c3d4: true,
		})
		expect(userwidgets.User.Permissions.set(permissions, "a1b2c3d4", ["user"])).toEqual({
			a1b2c3d4: { user: true },
		})
		expect(
			userwidgets.User.Permissions.set({ a1b2c3d4: { user: { view: true, admin: true } } }, "a1b2c3d4", ["user"])
		).toEqual({
			a1b2c3d4: { user: true },
		})
		expect(userwidgets.User.Permissions.set(permissions, "a1b2c3d4", [""])).toEqual({
			a1b2c3d4: { user: { view: true } },
		})
		expect(userwidgets.User.Permissions.set(permissions, "a1b2c3d4", ["user.admin"])).toEqual({
			a1b2c3d4: { user: { view: true, admin: true } },
		})
		expect(userwidgets.User.Permissions.set(permissions, "*", ["user.admin"])).toEqual({
			"*": { user: { admin: true } },
			a1b2c3d4: { user: { view: true } },
		})
	})
	it("merge", () => {
		expect(userwidgets.User.Permissions.merge("8UNxUAHs.user.view", "Aq3SUei-.user.view")).toEqual(
			"8UNxUAHs.user.view Aq3SUei-.user.view"
		)
		expect(
			userwidgets.User.Permissions.merge(
				{ "*": { user: { view: true } }, a1b2c3d4: { user: { view: true } } },
				{ "*": { org: { view: true } }, a1b2c3d4: { user: { admin: true } } }
			)
		).toEqual({ "*": { user: { view: true }, org: { view: true } }, a1b2c3d4: { user: { view: true, admin: true } } })
		expect(userwidgets.User.Permissions.merge({ "8UNxUAHs": { org: true } }, { "8UNxUAHs": true })).toEqual({
			"8UNxUAHs": true,
		})
	})
	it("filter", () => {
		const permissions = "*.user.view id.org.edit id.org.view od.org.view od.user.view"
		expect(userwidgets.User.Permissions.filter(permissions, ["id", "od", "*"])).toEqual(permissions)
		expect(userwidgets.User.Permissions.filter(permissions, ["id"])).toEqual("id.org.edit id.org.view")
		expect(userwidgets.User.Permissions.filter(permissions, ["od"])).toEqual("od.org.view od.user.view")
		expect(userwidgets.User.Permissions.filter(permissions, ["*"])).toEqual("*.user.view")
	})
	it("organizations", () => {
		const permissions = "id.user.view od.user.view od.user.edit"
		expect(userwidgets.User.Permissions.organizations(permissions)).toEqual(["id", "od"])
	})
})
