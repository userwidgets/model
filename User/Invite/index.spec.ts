import { isoly } from "isoly"
import { authly } from "authly"
import { isly } from "isly"
import { userwidgets } from "../../index"

const now = new Date(Math.floor(new Date().getTime() / 1000) * 1000)
authly.Issuer.defaultIssuedAt = now.getTime() / 1000
const issued = isoly.DateTime.create(now.getTime() / 1000)
const expires = isoly.DateTime.create(now.getTime() / 1000 + 60 * 60 * 24 * 3)

describe("User.Invite", () => {
	const privateKey =
		"MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC7VJTUt9Us8cKj" +
		"MzEfYyjiWA4R4/M2bS1GB4t7NXp98C3SC6dVMvDuictGeurT8jNbvJZHtCSuYEvu" +
		"NMoSfm76oqFvAp8Gy0iz5sxjZmSnXyCdPEovGhLa0VzMaQ8s+CLOyS56YyCFGeJZ" +
		"qgtzJ6GR3eqoYSW9b9UMvkBpZODSctWSNGj3P7jRFDO5VoTwCQAWbFnOjDfH5Ulg" +
		"p2PKSQnSJP3AJLQNFNe7br1XbrhV//eO+t51mIpGSDCUv3E0DDFcWDTH9cXDTTlR" +
		"ZVEiR2BwpZOOkE/Z0/BVnhZYL71oZV34bKfWjQIt6V/isSMahdsAASACp4ZTGtwi" +
		"VuNd9tybAgMBAAECggEBAKTmjaS6tkK8BlPXClTQ2vpz/N6uxDeS35mXpqasqskV" +
		"laAidgg/sWqpjXDbXr93otIMLlWsM+X0CqMDgSXKejLS2jx4GDjI1ZTXg++0AMJ8" +
		"sJ74pWzVDOfmCEQ/7wXs3+cbnXhKriO8Z036q92Qc1+N87SI38nkGa0ABH9CN83H" +
		"mQqt4fB7UdHzuIRe/me2PGhIq5ZBzj6h3BpoPGzEP+x3l9YmK8t/1cN0pqI+dQwY" +
		"dgfGjackLu/2qH80MCF7IyQaseZUOJyKrCLtSD/Iixv/hzDEUPfOCjFDgTpzf3cw" +
		"ta8+oE4wHCo1iI1/4TlPkwmXx4qSXtmw4aQPz7IDQvECgYEA8KNThCO2gsC2I9PQ" +
		"DM/8Cw0O983WCDY+oi+7JPiNAJwv5DYBqEZB1QYdj06YD16XlC/HAZMsMku1na2T" +
		"N0driwenQQWzoev3g2S7gRDoS/FCJSI3jJ+kjgtaA7Qmzlgk1TxODN+G1H91HW7t" +
		"0l7VnL27IWyYo2qRRK3jzxqUiPUCgYEAx0oQs2reBQGMVZnApD1jeq7n4MvNLcPv" +
		"t8b/eU9iUv6Y4Mj0Suo/AU8lYZXm8ubbqAlwz2VSVunD2tOplHyMUrtCtObAfVDU" +
		"AhCndKaA9gApgfb3xw1IKbuQ1u4IF1FJl3VtumfQn//LiH1B3rXhcdyo3/vIttEk" +
		"48RakUKClU8CgYEAzV7W3COOlDDcQd935DdtKBFRAPRPAlspQUnzMi5eSHMD/ISL" +
		"DY5IiQHbIH83D4bvXq0X7qQoSBSNP7Dvv3HYuqMhf0DaegrlBuJllFVVq9qPVRnK" +
		"xt1Il2HgxOBvbhOT+9in1BzA+YJ99UzC85O0Qz06A+CmtHEy4aZ2kj5hHjECgYEA" +
		"mNS4+A8Fkss8Js1RieK2LniBxMgmYml3pfVLKGnzmng7H2+cwPLhPIzIuwytXywh" +
		"2bzbsYEfYx3EoEVgMEpPhoarQnYPukrJO4gwE2o5Te6T5mJSZGlQJQj9q4ZB2Dfz" +
		"et6INsK0oG8XVGXSpQvQh3RUYekCZQkBBFcpqWpbIEsCgYAnM3DQf3FJoSnXaMhr" +
		"VBIovic5l0xFkEHskAjFTevO86Fsz1C2aSeRKSqGFoOQ0tmJzBEs1R6KqnHInicD" +
		"TQrKhArgLXX4v3CddjfTRJkFWDbE/CkvKZNOrcf1nhaGCPspRJj2KUkj1Fhl9Cnc" +
		"dn/RsYEONbwQSjIfMPkvxF+8HQ=="
	const publicKey =
		"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo" +
		"4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u" +
		"+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyeh" +
		"kd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ" +
		"0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdg" +
		"cKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbc" +
		"mwIDAQAB"
	const creatable: userwidgets.User.Invite.Creatable = {
		email: "jane@example.com",
		active: false,
		permissions: "*.app.view *.org.view *.user.view acme.organization.view acme.user.view",
	}
	it("is", () => {
		const invite: userwidgets.User.Invite = {
			email: "jane@example.com",
			active: true,
			permissions: {
				"*": {
					app: { view: true },
					org: { view: true },
					user: { view: true },
				},
				"---o1---": {
					org: { view: true },
					user: { view: true },
					custom: { view: true },
				},
			},
			audience: "applicationId",
			issuer: "jest",
			issued: "2022-08-03T10:53:14.130Z",
			expires: "2022-08-03T10:53:14.130Z",
			token: "a.fake.token",
		}
		expect(userwidgets.User.Invite.is(invite)).toEqual(true)
	})
	it("signing", async () => {
		const issuer = userwidgets.User.Invite.Issuer.create(
			"userwidgets",
			"---a1---",
			// Generated by using Cryptly:
			// const signerGenerated = Signer.generate("RSA", "SHA-256", 4096)
			// console.log("Generated key: ", {
			// 	public: await signerGenerated.export("public", "base64"),
			// 	private: await signerGenerated.export("private", "base64"),
			// })
			"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANHX1PuqVidn8VbHgIGnz7/9ix90PKVmMa2ru4NW2De+95TMP9j6pR2H4UGbOB442hxx6g/2nOMgJemc30J3UR0CAwEAAQ==",
			"MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA0dfU+6pWJ2fxVseAgafPv/2LH3Q8pWYxrau7g1bYN773lMw/2PqlHYfhQZs4HjjaHHHqD/ac4yAl6ZzfQndRHQIDAQABAkA4ASWLwUtbGwezRG2MrQ/qSq3dyDUDY8HwevwBsqTkQ2ytqLEBW0G+Cs0+njKNyvaqh5Ej10JqAGt4LNWS0I/VAiEA6+qckEJ6tUvf+pvbC/4aXmUI/dErNDYa9mSuDV/BW4cCIQDjtP83TsduxKLrpZkMLM0OUavBj3o/fG5LkWX9m9c/OwIgK9+p1jpGz8iYkubBSe2rwbpQfcOUoVUelowKwnn4X6kCIQC7Zy4YpcRq/HideieQppqI61xxLBVPhKf9l4eaBpVLGwIhAL3xxhKrp1jQiAIhaEmR1Zpft6LPXy5agQFvTAQYTjgh"
		)

		const token = await issuer.sign(creatable, now.getTime() / 1000)
		expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
	})
	it("signing and verifying (authly)", async () => {
		const issuer = authly.Issuer.create<userwidgets.User.Invite.Creatable>(
			"userwidgets",
			authly.Algorithm.RS256(publicKey, privateKey)
		)
		const verifier = authly.Verifier.create(authly.Algorithm.RS256(publicKey))
		const unsignedVerifier = authly.Verifier.create(authly.Algorithm.none())
		if (!issuer || !verifier || !unsignedVerifier) {
			expect(issuer).not.toEqual(undefined)
			expect(verifier).not.toEqual(undefined)
			expect(unsignedVerifier).not.toEqual(undefined)
			return
		}
		const token = await issuer.sign(creatable, Math.floor(now.getTime() / 1000))
		const result = await verifier.verify(token)
		expect(result).toEqual({ ...creatable, iss: "userwidgets", iat: Math.floor(now.getTime() / 1000), token: token })
	})
	it("signing and verifying", async () => {
		const issuer = userwidgets.User.Invite.Issuer.create("userwidgets", "applicationId", publicKey, privateKey)
		const verifier = userwidgets.User.Invite.Verifier.create(publicKey)
		const token = await issuer.sign(creatable, Math.floor(now.getTime() / 1000))
		const result = await verifier.verify(token)
		expect(result).toEqual({
			...(({ permissions, ...creatable }) => creatable)(creatable),
			permissions: {
				"*": {
					app: { view: true },
					org: { view: true },
					user: { view: true },
				},
				acme: { organization: { view: true }, user: { view: true } },
			},
			issuer: "userwidgets",
			issued: issued,
			expires: expires,
			audience: "applicationId",
			token: token,
		})
	})
	it("signing and verifying custom invite", async () => {
		type Permissions = { foo?: { view?: boolean } }
		const permissions = isly.object<Permissions>({
			foo: isly.object({ view: isly.boolean(true).optional() }).optional(),
		})
		const type = Object.assign(userwidgets.User.Invite.type.create(permissions), {
			creatable: userwidgets.User.Invite.Creatable.type,
		})
		const creatable: userwidgets.User.Invite.Creatable = {
			email: "jessie@rocket.com",
			permissions: "o--o1--o.user.view",
			active: false,
		}
		const issuer = userwidgets.User.Invite.Issuer.create("issuer", "audience", publicKey, privateKey)
		const token = await issuer.sign(creatable)
		if (token == undefined) {
			expect(typeof token).toEqual("string")
			return
		}
		const verifier = userwidgets.User.Invite.Verifier.create<Permissions>(publicKey)
		const invite = await verifier.verify(token)
		expect(type.is(invite)).toEqual(true)
		expect(type.get(invite)).toEqual({
			...(({ permissions, ...creatable }) => creatable)(creatable),
			permissions: { "o--o1--o": { user: { view: true } } },
			issuer: "issuer",
			audience: "audience",
			expires: expires,
			issued: issued,
			token: token,
		})
		expect(type.creatable.get(invite)).toEqual(undefined)
	})
})
