import { graphqlRequest } from "./setup";

let userToken: string;

beforeAll(async () => {
  const res = await graphqlRequest(`
    mutation {
      login(input: { email: "user1@test.com", password: "Password123" }) {
        accessToken
      }
    }
  `);

  userToken = res.body.data.login.accessToken;
});

describe("RBAC Tests", () => {
  test("User should NOT access users list", async () => {
    const res = await graphqlRequest(
      `{ users { id email } }`,
      userToken
    );

    expect(res.body.errors).toBeDefined();
  });
});