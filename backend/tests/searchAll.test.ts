const Lab = require("@hapi/lab")
const Code = require("@hapi/code")
const { searchAll } = require("../src/services/swapiService")

const { describe, it } = (exports.lab = Lab.script())
const { expect } = Code

describe("searchAll function", () => {
  it("should return success with data when valid category is provided", async () => {
    const result = await searchAll("people")

    expect(result.success).to.be.true()

    if ("data" in result) {
      expect(result.category).to.exist()
      expect(result.data).to.exist()
    }
  })

  it("should return error with data when invalid category is provided", async () => {
    const result = await searchAll("coucou")

    expect(result.success).to.be.false()

    if ("data" in result) {
      expect(result.category).to.not.exist()
      expect(result.data).to.not.exist()
    }
  })
})
