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

describe("Boards Tests", () => {
  test("Should fetch boards", async () => {
    const res = await graphqlRequest(
      `{ boards { id name } }`,
      token
    );

    expect(res.body.data.boards.length).toBeGreaterThan(0);
  });
});