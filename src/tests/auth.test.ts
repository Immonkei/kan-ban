import { graphqlRequest } from "./setup";

let token: string;

describe("Auth Tests", () => {
  test("Login as admin should return token", async () => {
    const res = await graphqlRequest(`
      mutation {
        login(input: { email: "admin@test.com", password: "Password123" }) {
          accessToken
          refreshToken
          user {
            id
            email
            role
          }
        }
      }
    `);

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data?.login?.accessToken).toBeDefined();
    expect(res.body.data?.login?.user?.email).toBe("admin@test.com");

    token = res.body.data.login.accessToken;
  });

  test("Login should fail with wrong password", async () => {
    const res = await graphqlRequest(`
      mutation {
        login(input: { email: "admin@test.com", password: "wrong" }) {
          accessToken
          refreshToken
          user {
            id
            email
          }
        }
      }
    `);

    expect(res.body.errors).toBeDefined();
  });
});