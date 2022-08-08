const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest");

beforeAll(() => {
  mongoose.connect(process.env.MONGODB_URL);
});

describe("test!", () => {
  let id;

  it("read test get method", async () => {
    const response = await request(app).get("/read");
    expect(response.status).toBe(200);
  });

  it("create test post method", async () => {
    const response = await request(app).post("/create").send({ title: "test title", password: "test" });
    id = response.body.id;
    expect(response.body.success).toBe(true);
  });

  it("update(countUp_Yes) test post method", async () => {
    const response = await request(app).post("/update/count_up").send({ _id: id, type: true });
    expect(response.body.msg).toBe("Yes UP 성공.");
  });

  it("update(countUp_No) test post method", async () => {
    const response = await request(app).post("/update/count_up").send({ _id: id, type: false });
    expect(response.body.msg).toBe("No UP 성공.");
  });

  it("update(done) test post method", async () => {
    const response = await request(app).post("/update/done").send({ _id: id, password: "test" });
    expect(response.body.success).toBe(true);
  });

  it("update(countUp_done) test post method", async () => {
    const response = await request(app).post("/update/count_up").send({ _id: id, type: true });
    expect(response.body.msg).toBe("종료된 투표입니다.");
  });

  it("delete test post method", async () => {
    const response = await request(app).post("/delete").send({ _id: id, password: "test" });
    expect(response.body.success).toBe(true);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
