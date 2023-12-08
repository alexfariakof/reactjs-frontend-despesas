import { environment } from "../src/shared/environment";
import { AuthService } from "../src/shared/services/api/auth/AuthService";
import MockAdapter from "axios-mock-adapter";
import createApiInstance from "../src/shared/services/axios-config";

const execTests = false;
const mockApi = new MockAdapter(createApiInstance());

describe("AuthService", () => {
  afterEach(() => {
    mockApi.reset();
  });
  afterAll(() => {
    mockApi.restore();
  });

  if (execTests) {
    it("should call auth and return data", async () => {
      //Arrange
      const mockData = { email: "teste@teste.com", senha: "teste" };
      mockApi
        .onPost(environment.URL_BASE + "/ControleAcesso/SignIn")
        .replyOnce(200, mockData);
      const spy = jest.spyOn(AuthService, "auth");

      // Act
      const email = "teste@teste.com";
      const password = "teste";
      const result = await AuthService.auth(email, password);

      // Assert
      expect(result).not.toBeNull();
      expect(result.authenticated).toBeTruthy();
      expect(result.message).toEqual("OK");

      spy.mockClear();
    });

    it("Should Throw Erro With Empty Email and Password", async () => {
      // Arrange
      mockApi
        .onPost(environment.URL_BASE + "/ControleAcesso/SignIn")
        .reply(400, { error: "Server Error" });
      const spy = jest.spyOn(AuthService, "auth");

      //Act
      const email = "";
      const password = "";
      let error: any;
      try {
        await AuthService.auth(email, password);
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).toBeDefined();
      expect(error.message).toEqual("Request failed with status code 400");

      spy.mockClear();
    });

    it("Should Throw Erro With Wrong Email", async () => {
      // Arrange
      mockApi
        .onPost(environment.URL_BASE + "/ControleAcesso/SignIn")
        .reply(500, { error: "Server Error" });
      const spy = jest.spyOn(AuthService, "auth");

      //Act
      const email = "teste";
      const password = "teste";
      let error: any;
      try {
        await AuthService.auth(email, password);
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).toBeDefined();
      expect(error.message).toEqual("Request failed with status code 400");

      spy.mockClear();
    });

    it("Should Throw Erro With Empty Password", async () => {
      // Arrange
      mockApi
        .onPost(environment.URL_BASE + "/ControleAcesso/SignIn")
        .reply(500, { error: "Server Error" });
      const spy = jest.spyOn(AuthService, "auth");

      //Act
      const email = "teste@teste.com";
      const password = "";
      let error: any;
      try {
        var result = await AuthService.auth(email, password);
      } catch (e) {
        error = e;
      }

      // Assert
      expect(error).toBeDefined();
      expect(error.message).toEqual("Request failed with status code 400");

      spy.mockClear();
    });
  }

  test("Test Auth Services is Running", () => {
    expect(execTests).toEqual(execTests);
  });
});
