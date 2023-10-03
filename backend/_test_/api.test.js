const request = require("supertest");
const app = require("../controller");

// Post testing

describe("Post /addData", () => {
  it("Should post data to backend", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      Email: "john@gmail.com",
      Phone: 3009086222,
      Password: "Raj@123",
      Language: "1",
    };
    const res = await request(app).post("/userdata").send(payload);
    expect(res.status).toBe(200);
  });

  it("Should post data within 200ms", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      Email: "roja@gmail.com",
      Phone: 7905505069,
      Password: "Roja@123",
      Language: "2",
    };
    const startTime = Date.now();
    const res = await request(app).post("/userdata").send(payload);
    const endTime = Date.now();
    const resTime = endTime - startTime;
    expect(res.status).toBe(200);
    expect(resTime).toBeLessThan(200);
  });

  it("Error -> Invalid email", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      Email: "balagmail.com",
      Phone: 1234567890,
      Password: "kjbfkgdjygfege",
      Language: "Tamil",
    };
    const res = await request(app).post("/userdata").send(payload);
    expect(res.status).toBe(400);
  });
  it("Error -> Invalid phone", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      Email: "bala@gmail.com",
      Phone: 1234560,
      Password: "kjbfkgdjygfege",
      Language: "Tamil",
    };
    const res = await request(app).post("/userdata").send(payload);
    expect(res.status).toBe(400);
  });
});

// // update testing

describe("Update /editdata", () => {
  it("Should edit the data in the backend", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      email: "mendix@gmail.com",
      phone: 9906669898,
      id: "1",
    };

    const res = await request(app).put("/editdata").send(payload);
    expect(res.status).toBe(200);
  });

  it("Should edit data within 200ms", async () => {
    const payload = {
      Firstname: "john",
      Lastname: "mark",
      email: "Rajam@gmail.com",
      phone: 7799970076,
      language: "English",
      role: "Reviewer",
      id: 20,
    };

    const startTime = Date.now();

    const res = await request(app).put("/editdata").send(payload);

    const endTime = Date.now();

    const resTime = endTime - startTime;

    expect(res.status).toBe(200);

    expect(resTime).toBeLessThan(200);
  });
});

describe("Delete /remove data", () => {
  it("Should delete a data", async () => {
    const payload = { id: 19 };

    const res = await request(app).delete("/deletedata").send(payload);

    expect(res.status).toBe(200);
  });

  it("Should delete data within 200ms", async () => {
    const payload = { id: 20 };

    const startTime = Date.now();

    const res = await request(app).delete("/deletedata").send(payload);

    const endTime = Date.now();

    const resTime = endTime - startTime;

    expect(res.status).toBe(200);

    expect(resTime).toBeLessThan(200);
  });
});

describe("Get /fetch", () => {
  it("Should return set of data", async () => {
    const res = await request(app).get("/userdetails/8");

    expect(res.status).toBe(200);
  });

  it("Should return data within 200ms", async () => {
    const startTime = Date.now();

    const res = await request(app).get("/userdetails/9");

    const endTime = Date.now();

    const resTime = endTime - startTime;

    expect(res.status).toBe(200);

    expect(resTime).toBeLessThan(200);
  });
});

describe("Get /get the data", () => {
  it("Should bring the data to dashboard", async () => {
    const res = await request(app).get("/getuserdata");

    expect(res.status).toBe(200);
  });

  it("Should return data within 200ms", async () => {
    const startTime = Date.now();

    const res = await request(app).get("/getuserdata");

    const endTime = Date.now();

    const resTime = endTime - startTime;

    expect(res.status).toBe(200);

    expect(resTime).toBeLessThan(200);
  });
});
