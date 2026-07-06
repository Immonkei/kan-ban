import { graphqlRequest } from "./setup";

let token: string;

beforeAll(async () => {
  const res = await graphqlRequest(`
    mutation {
      login(input: { email: "admin@test.com", password: "Password123" }) {
        accessToken
      }
    }
  `);

  token = res.body.data.login.accessToken;
});

describe("Tasks Tests", () => {
  test("Should fetch tasks", async () => {
    const res = await graphqlRequest(
      `{ tasks { id title status } }`,
      token
    );

    expect(res.body.data.tasks.length).toBeGreaterThan(0);
  });
});