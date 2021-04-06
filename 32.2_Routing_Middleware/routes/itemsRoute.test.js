process.env.NODE_ENV = "test";

const request = require("supertest")
const app = require("../app")
const items = require("../fakeDB")

let item = { name: "pizza" }

beforeEach(function () {
    items.push(item)
})

afterEach(function () {
    items.length = 0;
})

describe("GET /items", () => {
    test("test existing db content", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([item])
    })

    test("test non-existing item in db", async () => {
        const res = await request(app).get("/items/lollipop");
        expect(res.statusCode).toBe(404);
    })
})

describe("POST /items", () => {
    test("test post route", async () => {
        const res = await request(app)
            .post("/items")
            .send({ name: "mojito" })
        expect(res.statusCode).toBe(200)
         expect(res.body).toEqual([item, {"name": "mojito"} ])
    })
})

describe("PATCH /items", () => {
    test("test patch route", async () => {
        const res = await request(app)
            .patch("/items/pizza")
            .send({ name: "NoPizza" })
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"name": "NoPizza"})
    })
})

describe("DELETE /items", () => {
    test("test delete route", async () => {
        const res = await request(app)
            .delete("/items/pizza")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: "Deleted"})
    })
})

